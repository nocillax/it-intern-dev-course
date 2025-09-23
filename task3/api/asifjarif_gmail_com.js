module.exports = (req, res) => {
  const xStr = req.query.x;
  const yStr = req.query.y;

  // Only non-negative integers allowed, no extra characters
  if (!/^\d+$/.test(xStr) || !/^\d+$/.test(yStr)) {
    res.status(200).send("NaN");
    return;
  }

  const x = BigInt(xStr);
  const y = BigInt(yStr);

  // Special case: both zero
  if (x === 0n && y === 0n) {
    res.status(200).send("0");
    return;
  }

  // GCD using BigInt
  const gcd = (a, b) => {
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  // LCM using BigInt
  const lcm = (a, b) => (a * b) / gcd(a, b);

  res.status(200).send(lcm(x, y).toString());
};
