const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const config = require("./config")[process.env.NODE_ENV || "dev"];
const PORT = config.port;

const client = new Client({
  connectionString: config.connectionString,
});

client.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/get_all_lists", (req, res) => {
  client
    .query(
      `SELECT *
    FROM pg_catalog.pg_tables
    WHERE schemaname != 'pg_catalog' AND 
        schemaname != 'information_schema';`
    )
    .then((result) => {
      // console.log(result.rows[0])
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/sample_td_list/all", (req, res) => {
  client
    .query("SELECT * FROM sample_td_list;")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/td_list:id", (req, res) => {
  client
    .query(`SELECT * FROM td_list${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.post("/api/new_td_list/:title", (req, res) => {
  client
    .query(
      `CREATE TABLE ${req.params.title} (
        id serial PRIMARY KEY,
        list_item varchar,
        completion_status boolean
    );`
    )
    .then((result) => {
      console.log(`Created new td_list table.`);
      res.send(`New td_list table: "${req.params.title}" created!`);
    })
    .catch((e) => console.error(e.stack));
});

app.post("/api/:title", (req, res) => {
  client
    .query(
      `INSERT INTO ${req.params.title} (list_item, completion_status) VALUES ('${req.body.item}', ${req.body.status});`
    )
    .then((result) => {
      console.log(`Added new item to the "${req.params.title}" list table.`);
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.patch("/api/:title/:id/update_item", (req, res) => {
  client
    .query(
      `UPDATE ${req.params.title} SET list_item = '${req.body.item}' WHERE id = ${req.params.id}`
    )
    .then((result) => {
      console.log(
        `Updated item name to "${req.body.item}" at row id: ${req.params.id}.`
      );
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.patch("/api/:title/:id/update_status", (req, res) => {
  client
    .query(
      `UPDATE ${req.params.title} SET completion_status = ${req.body.status} WHERE id = ${req.params.id}`
    )
    .then((result) => {
      console.log(`Updated status to at row id: ${req.params.id}.`);
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.delete("/api/:title/:id", (req, res) => {
  client
    .query(`DELETE FROM ${req.params.title} WHERE id = ${req.params.id}`)
    .then((result) => {
      console.log(
        `Deleted row in "${req.params.title}" list table at id: ${req.params.id}.`
      );
      res.send("Row successfully removed.");
    })
    .catch((e) => console.error(e.stack));
});

app.delete("/api/:title", (req, res) => {
  client
    .query(`DROP TABLE ${req.params.title};`)
    .then((result) => {
      console.log(`Deleted "${req.params.title}" list table.`);
      res.send(`"${req.params.title}" list table successfully removed.`);
    })
    .catch((e) => console.error(e.stack));
});

app.listen(PORT, () => {
  console.log(`Our app running on ${PORT}`);
});
