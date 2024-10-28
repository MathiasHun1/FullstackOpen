// TASK: Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.
//BMI = weight / height²
//Should print: Normal range

//TASK: Create an npm script for running the program with the command npm run calculateBmi

interface BmiValues {
  height: number;
  weight: number;
}

const parseArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Nincs elég adat");
  if (args.length > 4) throw new Error("Túl sok adat");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("A megadott adat nem szám");
  }

  return {
    weight: Number(args[2]),
    height: Number(args[3]),
  };
};

export const calculateBmi = (weight: number, height: number): string => {
  if (height === 0) throw new Error("Nem lehetsz 0cm magas!");
  if (weight === 0) throw new Error("Nem lehetsz 0kg nehéz!");

  const heightInMeter = height / 100;
  const index = weight / (heightInMeter * heightInMeter);

  if (index <= 18.4) {
    return "Underweight";
  } else if (index >= 18.5 && index <= 24.9) {
    return "Normal weight";
  } else {
    return "Overweight";
  }
};

const main = () => {
  try {
    const { weight, height } = parseArgs(process.argv);
    console.log(calculateBmi(weight, height));
  } catch (error) {
    let errorMessage = "Valami nem sikerült: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
};

if (require.main === module) {
  main();
}

// if (import.meta.url === new URL('', import.meta.url).href) {
//   main();
// }
