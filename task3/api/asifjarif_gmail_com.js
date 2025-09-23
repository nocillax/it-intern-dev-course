const gcd = (x, y) => {
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
};

const lcm = (x, y) => {
  if (x <= 0 || y <= 0) return NaN;
  return (x * y) / gcd(x, y);
};

module.exports = (req, res) => {
  const x = parseInt(req.query.x);
  const y = parseInt(req.query.y);

  if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
    res.status(200).send("NaN");
  } else {
    res.status(200).send(lcm(x, y).toString());
  }
};
