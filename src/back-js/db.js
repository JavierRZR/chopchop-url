import { MongoClient, Db } from "mongodb";

let dbConnection = null;

export const connectToDb = (cb) => {
  MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
      dbConnection = client.db();
      cb();
    })
    .catch((err) => {
      console.error(err);
      cb(err);
    });
};

export const getDb = () => dbConnection;
