import * as sqlite from 'sqlite3'



const DBSOURCE = `db_testBackNode.sqlite`;

let db = new sqlite.Database(DBSOURCE, (err) => {
    if(err) {
        console.log(err.message);
        throw err;
    } else {
        //los users...
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            lastName text,
            email text,
            password text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });


    }
})

export default db