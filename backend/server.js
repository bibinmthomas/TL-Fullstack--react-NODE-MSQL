const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const db = require("./models");

dotenv.config();
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then((req) => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
});
