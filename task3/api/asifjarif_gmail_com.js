const gcd = (x, y) => {
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
};

const lcm = (x, y) => {
  return (x * y) / gcd(x, y);
};

module.exports = (req, res) => {
  const xStr = parseInt(req.query.x);
  const yStr = parseInt(req.query.y);

  if (!/^[1-9]\d*$/.test(xStr) || !/^[1-9]\d*$/.test(yStr)) {
    res.status(200).send("NaN");
    return;
  }

  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);

  res.status(200).send(lcm(x, y).toString());
};
