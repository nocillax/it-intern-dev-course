let strings = process.argv.slice(2);
if (strings.length === 0) console.log("");
else {
  let base = strings.reduce((a, b) => (a.length < b.length ? a : b));
  let ans = "";
  for (let i = 0; i < base.length; i++)
    for (let j = base.length; j > i + ans.length; j--) {
      let substring = base.slice(i, j);
      if (strings.every((s) => s.includes(substring))) {
        if (substring.length > ans.length) ans = substring;
        if (substring.length === base.length) break;
      }
    }
  console.log(ans);
}
