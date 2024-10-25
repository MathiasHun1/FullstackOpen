interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ArgValues {
  trainingHoursPerDay: number[];
  target: number;
}

const parseArgs = (args: string[]): ArgValues => {
  if (args.length < 4) throw new Error("Kevés inormációt adtál");

  const days = args.slice(2, args.length - 1);
  const convertedDays = days.map((day) => {
    if (isNaN(Number(day))) throw new Error("Csak számokat adhatsz meg");
    return Number(day);
  });

  const target = Number(args[args.length - 1]);
  if (isNaN(target)) throw new Error("A megadott cél csak szám lehet");

  return {
    trainingHoursPerDay: convertedDays,
    target,
  };
};

const calculateExercises = (
  trainingHoursPerDay: number[],
  target: number,
): Result => {
  const periodLength = trainingHoursPerDay.length;
  const trainingDays = trainingHoursPerDay.reduce((total, value) => {
    if (value > 0) return total + 1;
    return total;
  }, 0);

  const average =
    trainingHoursPerDay.reduce(
      (prevValue, currentValue) => prevValue + currentValue,
    ) / trainingHoursPerDay.length;

  const success = average >= target ? true : false;

  let rating;
  if (average < target / 2) {
    rating = 0;
  } else if (average > target / 2 && average < target) {
    rating = 1;
  } else {
    rating = 2;
  }

  let ratingDescription = "";
  switch (rating) {
    case 0: {
      ratingDescription = "Szánalamas";
      break;
    }
    case 1: {
      ratingDescription = "Elfogadható";
      break;
    }
    case 2: {
      ratingDescription = "Kiváló";
      break;
    }
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { trainingHoursPerDay, target } = parseArgs(process.argv);
  console.log(calculateExercises(trainingHoursPerDay, target));
} catch (error) {
  let errorMessage = "Valami nem sikerült: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises([1, 1.6, 0, 3, 0, 0, 2], 2))
