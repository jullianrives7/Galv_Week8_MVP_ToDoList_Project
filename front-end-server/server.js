const config = require("./config")[process.env.NODE_ENV || "dev"];
const express = require("express");
const PORT = config.port;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(
    `your front end server that serves up static files, is listening on ${PORT}`
  );
});
