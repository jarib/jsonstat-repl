#!/usr/bin/env node

var JSONStat = require('jsonstat');
var repl = require('repl');
var fetch = require('node-fetch');
var util = require('util');

const url = process.argv[2]

if (!url) {
  console.error('USAGE: jsonstat-repl <url>');
  process.exit(1);
}

fetch(url).then(res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(
      new Error('unable to fetch ' + url + ': ' + res.status + ' ' + res.statusText)
    );
  }
}).then(data => {
  var ds = JSONStat(data);

  if (!ds.length) {
    console.error('No JSON-stat data in the provided dataset.')
    process.exit(1);
  }

  function inspect() {
    ds.Dataset().forEach(ds => {
      console.log(`Dataset: ${ds.label} (length = ${ds.length})`)

      ds.Dimension().forEach(dim => {
        console.log(`  Dimension: ${dim.label} (length = ${dim.length}`)

        dim.Category().forEach(cat => {
          console.log(`     Category: ${cat.label} (index = ${cat.index})`)
        })

        console.log();
      })
    })
  }


  console.log('Your dataset is now stored in the `ds` variable. Run inspect() to see the dataset, dimensions and categories.')

  var r = repl.start({
    prompt: '> ',
    input: process.stdin,
    output: process.stdout
  });

  r.context.ds = ds;
  r.context.inspect = inspect;
})
.catch(console.error)

