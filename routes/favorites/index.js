const favoritesRouter = require("express").Router();
const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("favorites.db");

favoritesRouter.get('/', (req, res, next) => {
    if (req.query.id && !isNaN(parseInt(req.query.id)) && parseInt(req.query.id) >= 0 && parseInt(req.query.id) <= 810) {
        var stmt = db.prepare('SELECT id FROM favorites WHERE rowid = ?');
        stmt = stmt.get(parseInt(req.query.id)+1, (error, row) => {
            if (error) {
                console.log("Value could not be extracted");
                console.log(error);
                res.status(500).end();
            } else {
                if (!row) {
                    res.status(404).end();
                } else {
                    res.sendFile(`static/images/${row.id}.jpg`, {root:'./'})
                };
            }
        });
        stmt.finalize();
    }
});

closeDatabase = () => {
    db.close((err) => {
        if (err) {
            console.log("Database could not be closed");
            console.log(err);
        } else {
            console.log("Database closed");
        }
    });
}
process.on('SIGTERM', closeDatabase);

module.exports = favoritesRouter;