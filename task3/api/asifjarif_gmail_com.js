module.exports = (req, res) => {
  const xStr = req.query.x;
  const yStr = req.query.y;

  // Must be non-empty digits
  if (!/^\d+$/.test(xStr) || !/^\d+$/.test(yStr)) {
    res.status(200).send("NaN");
    return;
  }

  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);

  // Must be natural numbers (>= 1)
  if (x <= 0 || y <= 0) {
    res.status(200).send("NaN");
    return;
  }

  const gcd = (a, b) => {
    while (b !== 0) [a, b] = [b, a % b];
    return a;
  };

  const lcm = (a, b) => (a * b) / gcd(a, b);

  res.status(200).send(lcm(x, y).toString());
};
