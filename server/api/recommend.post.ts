import OpenAI from "openai";
import { z } from "zod";

const Recommendations = z.array(
  z.object({
    id: z.number().int(),
    imdbID: z.string(),
    title: z.string(),
    overview: z.string(),
    genres: z.string(),
    releaseDate: z.string(),
    runtime: z.number().int(),
    posterPath: z.string(),
  })
);
export type Recommendations = z.infer<typeof Recommendations>;

const openai = new OpenAI();

const runtimeConfig = useRuntimeConfig();
const MOVIE_RECOMMENDATION_ASSISTANT_ID =
  runtimeConfig.movieRecommendationAssistantID;

const getPrompt = (userInput: any) => {
  return `Recommend movies for ${userInput.partySize} ${
    userInput.partySize > 1 ? "viewers" : "viewer"
  }, with a maximum runtime of ${userInput.maxRuntime} minutes.

Base your recommendations on the following profile:

**Favorite movie**: ${userInput.favoriteMovie}
**Favorite actor**: ${userInput.favoriteActor}
**Time period**: ${userInput.prefersRecent}
**Keywords**: ${userInput.keywords.join(", ")}
  `;
};

const parseMarkdown = (markdown: string) => {
  const regex = new RegExp("^`+jsons*(.*?)s*`+$", "gms");
  const match = regex.exec(markdown);

  if (match) {
    const jsonString = match[1];
    return JSON.parse(jsonString);
  } else {
    console.warn(
      "Unable to parse Assistant's response to JSON:\n\n" + markdown
    );
  }
};

export default defineEventHandler(async (event) => {
  console.info("Getting recommendations from Assistant...");

  const userInput = await readBody(event);
  const prompt = getPrompt(userInput);

  try {
    let { id: threadID } = await openai.beta.threads.create();
    let run = await openai.beta.threads.runs.createAndPoll(threadID, {
      assistant_id: MOVIE_RECOMMENDATION_ASSISTANT_ID,
      additional_messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id, {
        order: "desc",
        limit: 1,
      });
      let recommendationText = "";
      if (messages.data[0].content[0].type === "text") {
        recommendationText = messages.data[0].content[0].text.value;
      }

      console.info("Checking recommendation is valid JSON...");
      // Assistant should return a Markdown codeblock with JSON
      const recommendationJSON = parseMarkdown(recommendationText);
      // Validate that JSON matches Zod schema
      const recommendationData = Recommendations.safeParse(recommendationJSON);

      if (recommendationData.success) {
        console.info("Success!");
        return recommendationData.data;
      } else {
        console.log(recommendationData.error.message);
      }
    } else {
      console.log(run.status);
    }
  } catch (e) {
    console.log(e);
  }
});
