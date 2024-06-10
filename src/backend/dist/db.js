"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectToDb = void 0;
const mongodb_1 = require("mongodb");
let dbConnection = null;
const connectToDb = (cb) => {
    mongodb_1.MongoClient.connect(process.env.MONGO_URL)
        .then((client) => {
        dbConnection = client.db();
        cb();
    })
        .catch((err) => {
        console.error(err);
        cb(err);
    });
};
exports.connectToDb = connectToDb;
const getDb = () => dbConnection;
exports.getDb = getDb;
//# sourceMappingURL=db.js.map