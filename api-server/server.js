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

app.get("/api/sample_td_list/all", (req, res) => {
  client
    .query("SELECT * FROM sample_td_list;")
    .then((result) => {
      // console.log(result.rows[0])
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/parents", (req, res) => {
  client
    .query("SELECT * FROM parents")
    .then((result) => {
      // console.log(result.rows[0])
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/children", (req, res) => {
  client
    .query("SELECT * FROM children")
    .then((result) => {
      // console.log(result.rows[0])
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/parents/:id", (req, res) => {
  client
    .query(`SELECT * FROM parents WHERE id = ${req.params.id}`)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/children/:id", (req, res) => {
  client
    .query(`SELECT * FROM children WHERE id = ${req.params.id}`)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.post("/api/parents/", (req, res) => {
  client
    .query(
      `INSERT INTO parents (dad, mom) VALUES ('${req.body.dad}', '${req.body.mom}')`
    )
    .then((result) => {
      console.log(`Added new entry to "parents" table.`);
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.post("/api/children/", (req, res) => {
  client
    .query(
      `INSERT INTO children (name, gender, parents_id) VALUES ('${req.body.name}', '${req.body.gender}', ${req.body.parents_id})`
    )
    .then((result) => {
      console.log(`Added new entry to "children" table.`);
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.patch("/api/parents/:id", (req, res) => {
  client
    .query(
      `UPDATE parents SET dad = '${req.body.dad}' WHERE id = ${req.params.id}`
    )
    .then((result) => {
      console.log(
        `Updated name for "dad" in parents table at row id:${req.params.id} to ${req.body.dad}.`
      );
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.patch("/api/children/:id", (req, res) => {
  client
    .query(
      `UPDATE children SET name = '${req.body.name}' WHERE id = ${req.params.id}`
    )
    .then((result) => {
      console.log(
        `Updated name in children table at row id:${req.params.id} to ${req.body.name}.`
      );
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.delete("/api/parents/:id", (req, res) => {
  client
    .query(`DELETE FROM parents WHERE id = '${req.params.id}'`)
    .then((result) => {
      console.log(`Deleted parents table row where id=${req.params.id}.`);
      res.send("Row successfully removed.");
    })
    .catch((e) => console.error(e.stack));
});

app.delete("/api/children/:id", (req, res) => {
  client
    .query(`DELETE FROM children WHERE id = '${req.params.id}'`)
    .then((result) => {
      console.log(`Deleted children table row where id=${req.params.id}.`);
      res.send("Row successfully removed.");
    })
    .catch((e) => console.error(e.stack));
});

app.listen(PORT, () => {
  console.log(`Our app running on ${PORT}`);
});

// app.post("/api/parents/", (request, response) => {
//   let studentJson = request.body;
//   console.log(studentJson);
//   if (studentJson.age && studentJson.first_name) {
//     client.query(
//       `INSERT INTO parents (mom, dad) VALUES (${req.body.mom}, ${req.body.dad})`,
//       (error, result) => {
//         if (error) {
//           response.status(500).send(error);
//         } else {
//           console.log("response successful", result);
//           response.status(201).send("Success!");
//         }
//       }
//     );
//   } else {
//     response
//       .status(500)
//       .send(
//         "Please include names for the mom and dad in your request.\n Ex: mom=<name> dad=<name>"
//       );
//   }
// });

// app.post("/api/parents/", (request, response) => {
//   let studentJson = request.body;
//   console.log(studentJson);
//   if (studentJson.age && studentJson.first_name) {
//     client.query(
//       `INSERT INTO parents (mom, dad) VALUES (${req.body.mom}, ${req.body.dad})`,
//       (error, result) => {
//         if (error) {
//           response.status(500).send(error);
//         } else {
//           console.log("response successful", result);
//           response.status(201).send("Success!");
//         }
//       }
//     );
//   } else {
//     response
//       .status(500)
//       .send(
//         "Please include names for the mom and dad in your request.\n Ex: mom=<name> dad=<name>"
//       );
//   }
// });
