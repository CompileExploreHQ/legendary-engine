import express, { Application } from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { ConfigImpl } from "./config/config";
import { DbEvent } from "./persistence/models/Event";

const configs = new ConfigImpl();

interface EventInput {
  name: string;
  description: string;
  price: number;
  date: Date;
}

const startServer = async () => {
  const app: Application = express();
  app.use(bodyParser.json());

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: buildSchema(`
        type Event {
          _id: ID!
          name: String!
          description: String!
          price: Float!
          date: String!
        }

        input EventInput {
          name: String!
          description: String!
          price: Float!
          date: String!
        }

        type RootQuery {
          events: [Event!]!
        }

        type RootMutation {
          createEvent(inputs: EventInput!): Event!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
      `),
      rootValue: {
        events: async () => {
          const events = await DbEvent.query();
          return events;
        },
        createEvent: async (args: { inputs: EventInput }) => {
          const event = new DbEvent();
          event.name = args.inputs.name;
          event.description = args.inputs.description;
          event.price = args.inputs.price;
          event.date = args.inputs.date;

          const insertedEvent = await DbEvent.query().insert(event).select("*");

          return insertedEvent;
        },
      },
      graphiql: true,
    })
  );

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
