// reduced file size for submission

s = process.argv.slice(2);
if (!s.length) console.log("");
else {
  b = s.reduce((a, v) => (a.length < v.length ? a : v));
  f = (l, x) =>
    new Set([...Array(x.length - l + 1)].map((_, i) => x.slice(i, i + l)));
  i = 1;
  h = b.length;
  g = "";
  while (i <= h) {
    m = (i + h) >> 1;
    c = f(m, b);
    for (x of s)
      if (x !== b) {
        c = new Set([...c].filter((z) => f(m, x).has(z)));
        if (!c.size) break;
      }
    if (c.size) {
      g = [...c][0];
      i = m + 1;
    } else h = m - 1;
  }
  console.log(g);
}
