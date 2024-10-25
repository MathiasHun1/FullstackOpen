import express from "express";
import { calculateBmi } from "./utility/bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!");
});

//GET endpoint to bmi, usinf query strings
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!(weight && height)) {
    res.status(401).json({ error: "invalid or missing input!" });
    return;
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(401).json({ error: "one of the arguments is not a number!" });
    return;
  }

  const result = calculateBmi(Number(weight), Number(height));

  res.status(200).json({
    height,
    weight,
    bmi: result,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
