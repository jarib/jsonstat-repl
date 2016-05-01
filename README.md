# jsonstat-repl

Explore a [JSON-stat](https://json-stat.org/) dataset in the node REPL.

For the JSONStat JS API, see the [JSON-stat Javascript Toolkit (JJT)](https://json-stat.com/)

## USAGE:

On the command line:

    $ jsonstat-repl http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/tsdec450

    > ds.Dimension().map(e => e.label)
    [ 'sex', 'geo', 'time' ]

As a module:

    import jsonStatRepl from 'jsonstat-repl';
    jsonStatRepl.explore(data);