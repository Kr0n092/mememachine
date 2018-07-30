const express = require('express');
const memesRouter = express.Router();

memesRouter.get('/', (req, res, next) => {
    let content = [];
    if ((req.query.from && !isNaN(parseInt(req.query.from)) && req.query.from >= 1) &&
        (req.query.to   && !isNaN(parseInt(req.query.to)    && req.query.to <= 808)) ) {
        for (let i = req.query.from; i < req.query.to; i++) {
            content.push({
                id: i,
                title: `Image number ${i}`,
                image: `/images/${i}.jpg`
            });
        }
    } else if (isNaN(parseInt(req.query.from)) || isNaN(parseInt(req.query.to))) {
        res.status(400);
    } else {
        for (let i = 1; i <= 808; i++) {
            content.push({
                id: i,
                title: `Image number ${i}`,
                image: `/images/${i}.jpg`
            });
        }
    }
    res.json(content);
});

module.exports = memesRouter;