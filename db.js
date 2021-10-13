const { type } = require('express/lib/response');
const { MongoClient } = require('mongodb');

const DB_NAME = process.env.DB_NAME;
const DEFAULT_COLLECTION = process.env.DEFAULT_COLLECTION;

const state = {
    db: null,
};

exports.connect = (url, done) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.log('MongoDB connection err:', err);
        }
        state.db = client.db(DB_NAME).collection(`${DEFAULT_COLLECTION}`);
        console.log('MongoDB db connected');
    });
    done();
};
exports.get = () => {
    return state.db;
}
