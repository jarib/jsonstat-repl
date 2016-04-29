#!/usr/bin/env node

var JSONStat = require('jsonstat');
var repl = require('repl');
var fetch = require('node-fetch');
var util = require('util');
var fs = require('fs');

var url = process.argv[2]

if (!url) {
  console.error('USAGE: jsonstat-repl <url | file>');
  process.exit(1);
}

if (fs.existsSync(url)) {
  explore(JSON.parse(fs.readFileSync(url, 'utf-8')));
} else {
  fetch(url).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(
        new Error('unable to fetch ' + url + ': ' + res.status + ' ' + res.statusText)
      );
    }
  }).then(explore).catch(console.error)
}

function explore(data) {
  var ds = JSONStat(data);

  if (!ds.length) {
    console.error('No JSON-stat data in the provided dataset.')
    process.exit(1);
  }

  function inspect() {
    console.log(`Class: ${ds.class}\nN: ${ds.n}\nUpdated: ${ds.updated}\n`);

    ds.Dataset().forEach(d => {
      console.log(`Dataset: ${d.label} (length = ${d.length})`)

      d.Dimension().forEach((dim, i) => {
        console.log(`  Dimension: ${dim.label} (length = ${dim.length}, role = ${dim.role}, id = ${d.id[i]})`)

        dim.Category().forEach(cat => {
          console.log(`     Category: ${cat.label} (index = ${cat.index}, unit = ${cat.unit ? cat.unit.base : ''}, id = ${dim.id[cat.index]})`)
        })
      })
    })
  }

  inspect();  
  console.log('\nYour dataset is now stored in the `ds` variable. Run inspect() to see the dataset, dimensions and categories.')

  var r = repl.start({
    prompt: '> ',
    input: process.stdin,
    output: process.stdout
  });

  r.context.ds = ds;
  r.context.inspect = inspect;
}

