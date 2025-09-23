module.exports = (req, res) => {
  const xStr = req.query.x;
  const yStr = req.query.y;

  // Must be all digits, non-empty
  if (!/^\d+$/.test(xStr) || !/^\d+$/.test(yStr)) {
    res.status(200).send("NaN");
    return;
  }

  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);

  // Reject negative numbers
  if (x < 0 || y < 0) {
    res.status(200).send("NaN");
    return;
  }

  const gcd = (a, b) => {
    while (b !== 0) [a, b] = [b, a % b];
    return a;
  };

  const lcm = (a, b) => {
    // Special case: both zero
    if (a === 0 && b === 0) return 0;
    return (a * b) / gcd(a, b);
  };

  res.status(200).send(lcm(x, y).toString());
};
