export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union type: ${JSON.stringify(value)}`
  );
};
