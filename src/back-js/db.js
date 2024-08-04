import { MongoClient, Db } from "mongodb";

let dbConnection = null;
console.log("Abriendo archivo de connectar");

export const connectToDb = (cb) => {
  console.log("Connectando")
  console.log(process.env);
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
