const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

connectToMongo();
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));

app.get("/", (req, res) => {
  res.send("hello ish");
});

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});

