const express = require("express");
const memeRouter = express.Router();

memeRouter.get('/', (req, res, next) => {
    if (req.query.id && !isNaN(parseInt(req.query.id)) && req.query.id >= 1 && req.query.id <= 808) {
        res.sendFile(`images/${req.query.id}.jpg`, {root: './'});
    } else {
        res.status(404);
        res.end();
    }
});
module.exports = memeRouter;