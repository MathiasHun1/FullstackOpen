/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi } from "./utility/bmiCalculator";
import { calculateExercises, Result } from "./utility/exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!");
});

//GET endpoint to bmi, using query strings
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!(weight && height)) {
    res.status(401).json({ error: "invalid or missing input!" });
    return;
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(400).json({ error: "one of the arguments is not a number!" });
    return;
  }

  try {
    const result = calculateBmi(Number(weight), Number(height));

    res.status(200).json({
      height,
      weight,
      bmi: result,
    });
  } catch (error) {
    console.error("Console: ", error);
    let errorMessage = "Something bad happened: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.status(400).json({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const trainingHoursPerDay = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target = req.body.target;

  if (!trainingHoursPerDay || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (isNaN(Number(target)) || !Array.isArray(trainingHoursPerDay)) {
    res.status(400).json({ error: "mailformed parameters" });
    return;
  }

  const result: Result = calculateExercises(
    trainingHoursPerDay as number[],
    Number(target)
  );

  res.status(200).json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
