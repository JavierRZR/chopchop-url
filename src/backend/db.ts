import { MongoClient, Db } from "mongodb";

let dbConnection: Db | null = null;

export const connectToDb = (cb: (err?: Error) => void): void => {
  MongoClient.connect(process.env.MONGO_URL!)
    .then((client) => {
      dbConnection = client.db();
      cb();
    })
    .catch((err) => {
      console.error(err);
      cb(err);
    });
};

export const getDb = (): Db | null => dbConnection;
