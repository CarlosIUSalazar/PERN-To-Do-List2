//This file configures how we are gonna connect to DB
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "minxita",
    host: "localhost",
    port: 5432,
    database: "perntodo2"
})

module.exports = pool;