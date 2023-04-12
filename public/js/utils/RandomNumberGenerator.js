export function randomNumberGenerator(minimumValue, maximumValue) {
  return (
    Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue
  );
}
