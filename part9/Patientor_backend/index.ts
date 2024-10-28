import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.status(200).send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
