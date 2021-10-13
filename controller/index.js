const db = require('../db');
const { ObjectId } = require('mongodb');

function getAllArticlesDB() {
    return new Promise(resolve => {
        db.get()
            .find()
            .sort({ _id: -1 })
            .toArray((err, result) => {
                if (err) console.log(err);
                resolve(result);
            });
    });
}

function getArticleByIdDB(req) {
    return new Promise(resolve => {
        db.get()
            .findOne({
                _id: ObjectId(req.params.id),
            }, (err, result) => {
                if (err) console.log(err);
                resolve(result);
            });
    });
}

exports.getAll = async (req, res) => {
    let articles = await getAllArticlesDB();
    res.send(articles);
}

exports.createOne = (req, res) => {
    const newArticle = {
        title: req.body.title ? req.body.title : null,
        content: req.body.content ? req.body.content : null,
        owner: req.body.owner ? req.body.owner : null,
    };
    db.get()
        .insertOne(newArticle, (err) => {
            if (err) console.log(err);

            res.sendStatus(200);
        });
}

exports.getById = async function (req, res) {
    let article = await getArticleByIdDB(req);
    res.send(article);

};

exports.updateById = function (req, res) {
    const body = {
        title: req.body.title ? req.body.title : null,
        content: req.body.content ? req.body.content : null,
        owner: req.body.owner ? req.body.owner : null,
    }
    db.get()
        .updateOne(
            {
                _id: ObjectId(req.params.id),
            },
            {
                $set: body,
            },
            (err, result) => {
                if (err) console.log(err);
                res.sendStatus(200);
            }
        );
};

exports.deleteById = function (req, res) {
    db.get()
        .deleteOne(
            {
                _id: ObjectId(req.params.id),
            },
            (err) => {
                if (err) console.log(err);
                res.sendStatus(200);
            }
        );
};