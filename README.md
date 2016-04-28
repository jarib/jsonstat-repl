# jsonstat-repl

Explore a JSON-stat data set in the node REPL.

## USAGE:

    $ jsonstat-repl http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/tsdec450

    > ds.Dataset(0).Dimension().map(e => e.label)
    [ 'sex', 'geo', 'time' ]

