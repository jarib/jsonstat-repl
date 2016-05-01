#!/usr/bin/env node

var fetch = require('node-fetch');
var util = require('util');
var fs = require('fs');
var start = require('./').start;

var url = process.argv[2]

if (!url) {
  console.error('USAGE: jsonstat-repl url-or-file');
  process.exit(1);
}

if (fs.existsSync(url)) {
  start(JSON.parse(fs.readFileSync(url, 'utf-8')));
} else {
  fetch(url).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(
        new Error('unable to fetch ' + url + ': ' + res.status + ' ' + res.statusText)
      );
    }
  }).then(start).catch(console.error)
}
