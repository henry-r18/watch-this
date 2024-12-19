import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

const MOVIE_RECOMMENDATION_ASSISTANT_ID = "asst_SXh1jAE7nKs43BNOUrkMdBUj";
const MOVIE_RECOMMENDATION_THREAD_ID = "thread_qgeaEZQnaNhh93FQXkcmKpN4";
const DATA_PARSER_ASSISTANT_ID = "asst_xiySwz4kthH9CuU8hgoB4Ic9";
const DATA_PARSER_THREAD_ID = "thread_RDW7WmwTeaeej6NmkzlqMbDI";

const MovieRecommendation = z.object({
  list: z.array(
    z.object({
      id: z
        .number()
        .int()
        .describe("A zero-indexed, sequential ID for the recommendation."),
      title: z.string().describe("The title of the recommended movie."),
      releaseYear: z
        .string()
        .describe("The initial year of the movie's release, formatted as YYYY"),
      genre: z.string().describe("The primary genre of the movie."),
      plotSummary: z
        .string()
        .describe("A summary of the movie's plot, limited to 120 characters."),
    })
  ),
});

async function extractData(recommendationText: string) {
  let run = await openai.beta.threads.runs.createAndPoll(
    DATA_PARSER_THREAD_ID,
    {
      assistant_id: DATA_PARSER_ASSISTANT_ID,
    }
  );

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id, {
      order: "desc",
      limit: 1,
    });
    return messages.data[0].content[0].text.value;
  } else {
    console.log(run.status);
  }
}

export default defineEventHandler(async (event) => {
  console.info("Creating run on Assistant thread...");
  let run = await openai.beta.threads.runs.createAndPoll(
    MOVIE_RECOMMENDATION_THREAD_ID,
    {
      assistant_id: MOVIE_RECOMMENDATION_ASSISTANT_ID,
    }
  );

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id, {
      order: "desc",
      limit: 1,
    });
    const recommendationText = messages.data[0].content[0].text.value;
    console.info(
      "Successfully retrieved recommendations from Assistant\nCreating data parser thread..."
    );
    const recommendationData = await extractData(recommendationText);

    try {
      let recommendationList = JSON.parse(recommendationData).list;
      return recommendationList;
    } catch (e) {
      console.log(e);
      return e;
    }
  } else {
    console.log(run.status);
  }
});
