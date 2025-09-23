// Most optimal solution to find the LCS

let strings = process.argv.slice(2);

if (strings.length === 0) {
  console.log("");
} else {
  let base = strings.reduce((a, b) => (a.length < b.length ? a : b));

  const findSubStrings = (L, string) => {
    let substrings = new Set();
    for (let i = 0; i + L <= string.length; i++) {
      substrings.add(string.slice(i, i + L));
    }
    return substrings;
  };

  const intersect = (a, b) => new Set([...a].filter((x) => b.has(x)));

  let high = base.length;
  let low = 1;
  let best = "";

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    let common = findSubStrings(mid, base);

    for (let i = 0; i < strings.length; i++) {
      if (strings[i] === base) continue;
      let current = findSubStrings(mid, strings[i]);
      common = intersect(common, current);
      if (common.size === 0) break;
    }
    if (common.size > 0) {
      best = common.values().next().value;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  console.log(best);
}
