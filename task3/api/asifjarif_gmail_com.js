const express = require("express");
const app = express();

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

app.get("/asifjarif_gmail_com", (req, res) => {
  const x = parseInt(req.query.x);
  const y = parseInt(req.query.y);

  if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
    res.send("NaN");
  } else {
    res.send(lcm(x, y).toString());
  }
});

// Only listen when running locally
if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
}

// Export for Vercel serverless deployment
module.exports = app;
