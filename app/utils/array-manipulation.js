export function initializeArray(size) {
  return Array.apply(null, Array(size)).map(() => 0);
}

export function sumArray(array = []) {
  return array.reduce((total, current) => total + current);
}
