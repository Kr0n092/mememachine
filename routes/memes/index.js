const express = require('express');
const memesRouter = express.Router();

memesRouter.get('/', (req, res, next) => {
    let content = [];
    if ((req.query.from && !isNaN(parseInt(req.query.from)) && parseInt(req.query.from) >= 1) &&
        (req.query.to   && !isNaN(parseInt(req.query.to)    && parseInt(req.query.to) <= 811)) ) {
        for (let i = req.query.from; i < req.query.to; i++) {
            content.push({
                id: i,
                title: `Image number ${i}`,
                image: `/images/${i}.jpg`
            });
        }
    } else if (req.query.from && !isNaN(parseInt(req.query.from)) && parseInt(req.query.from) >= 1 && !req.query.to) {
        for (let i = parseInt(req.query.from); i <= 811; i++) {
            content.push({
                id: i,
                title: `Image number ${i}`,
                image: `/images/${i}.jpg`
            });
        }
    } else if (isNaN(parseInt(req.query.from)) || isNaN(parseInt(req.query.to))) {
        res.status(400);
    }
    res.json(content);
});

module.exports = memesRouter;