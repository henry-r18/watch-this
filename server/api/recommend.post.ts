import OpenAI from "openai";

const openai = new OpenAI();

const MOVIE_RECOMMENDATION_ASSISTANT_ID = "asst_SXh1jAE7nKs43BNOUrkMdBUj";
const MOVIE_RECOMMENDATION_THREAD_ID = "thread_qgeaEZQnaNhh93FQXkcmKpN4";
const DATA_PARSER_ASSISTANT_ID = "asst_xiySwz4kthH9CuU8hgoB4Ic9";
const DATA_PARSER_THREAD_ID = "thread_RDW7WmwTeaeej6NmkzlqMbDI";

async function extractData(recommendationText: string) {
  let run = await openai.beta.threads.runs.createAndPoll(
    DATA_PARSER_THREAD_ID,
    {
      assistant_id: DATA_PARSER_ASSISTANT_ID,
      additional_messages: [
        {
          role: "user",
          content: recommendationText,
        },
      ],
    }
  );

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id, {
      order: "desc",
      limit: 1,
    });
    if (messages.data[0].content[0].type === "text") {
      return messages.data[0].content[0].text.value;
    }
  } else {
    console.log(run.status);
  }
}

export default defineEventHandler(async (event) => {
  console.info("Getting recommendations from Assistant...");

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
    let recommendationText = "";
    if (messages.data[0].content[0].type === "text") {
      recommendationText = messages.data[0].content[0].text.value;
    }

    console.info("Parsing recommendations to JSON...");
    const recommendationData = await extractData(recommendationText);

    if (recommendationData) {
      try {
        let recommendationList = JSON.parse(recommendationData).list;
        console.info("Success!");
        return recommendationList;
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  } else {
    console.log(run.status);
  }
});
