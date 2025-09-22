const express = require("express");
const connectDb = require("../src/config/database");
const cors = require("cors");
const router = require("../src/routes/userRoute");

const app = express();
app.use(express.json());
app.use(cors());
connectDb();
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(8070, () => {
  console.log("Server running on port 8070");
});
