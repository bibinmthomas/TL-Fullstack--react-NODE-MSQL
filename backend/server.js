const express = require("express");
const app = express();

const db = require("./models");

app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then((req) => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
});
