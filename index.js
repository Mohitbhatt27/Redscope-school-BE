const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./src/config/server.config");
const connectDB = require("./src/config/db_config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connectDB();
