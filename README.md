Koch orgs
========

A demo of a sortable, filterable table, pulling data from a Google Fusion Table.

Usage
-----

    var table = new FusionTable(API_KEY, TABLE_ID);
    table.fetch(function() {
        table.render(el, columns);
    });