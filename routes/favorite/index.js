const favoriteRouter = require("express").Router();
const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database('favorites.db');
db.serialize(() => {
    db.run('DROP TABLE IF EXISTS favorites');
    db.run('CREATE TABLE favorites (id INTEGER)');
});

favoriteRouter.get('/', (req, res, next) => {
    if (req.query.id && !isNaN(parseInt(req.query.id)) && parseInt(req.query.id) >= 0 && parseInt(req.query.id) <= 810) {
        var stmt = db.prepare('INSERT INTO favorites(id) VALUES (?)');
        stmt = stmt.run(req.query.id, (error) => {
            if (error) {
                console.log("Value could not be inserted");
                console.log(error);
                res.status(500).end();
            } else {
                console.log("Value inserted");
                res.status(200).end();
            }
        });
        stmt.finalize();
    } else {
        console.log("Invalid id");
        res.status(400).end();
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

module.exports = favoriteRouter;

