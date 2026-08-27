const sum = (function() {
  let total = 0;

  return function(value) {
    total += value;
    return total;
  };
})();

console.log(sum(4));  // 4
console.log(sum(6));  // 10
console.log(sum(10)); // 20
console.log(sum(7));  // 27