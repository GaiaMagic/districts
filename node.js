var fs = require('fs');
var pinyin = require('pinyin_index');
var districts = require('./districts');

for (var i = 0; i < districts.length; i++) {
  districts[i].cities.sort(function (a, b) {
    return pinyin(a.city).full.localeCompare(pinyin(b.city).full);
  });
  for (var j = 0; j < districts[i].cities.length; j++) {
    districts[i].cities[j].areas.sort(function (a, b) {
      return pinyin(a).full.localeCompare(pinyin(b).full);
    });
  }
}

var tree = {};
for (var i = 0; i < districts.length; i++) {
  tree[districts[i].state] = tree[districts[i].state] || {};
  for (var j = 0; j < districts[i].cities.length; j++) {
    tree[districts[i].state][districts[i].cities[j].city] = districts[i].cities[j].areas;
  }
}

fs.writeFileSync('districts.tree.json', JSON.stringify(tree, null, 2) + '\n');
