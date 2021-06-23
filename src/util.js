/**
 * Compute the index of the maximium value in an array of numbers
 *
 * @param  {number[]} arr
 * @returns {number}
 */
const argMax = (arr) => {
  let ix = -1;
  let val = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element > val) {
      ix = i;
      val = element;
    }
  }
  return ix;
};

export { argMax };
