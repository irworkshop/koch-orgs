
function FusionTable(apikey, table_id) {
    this.apikey = apikey;
    this.table_id = table_id;
}

FusionTable.prototype.fetch = function(callback) {
    // grab data from this table and stash it
    // executes callback on parsed JSON data
    
    // create a simple sql statement
    var sql = "SELECT * FROM " + this.table_id
      , table = this;

    // run the query
    this.query(sql, function(err, data) {
        if (err) throw err;

        // grab columns and rows
        table.columns = data.columns;
        table.rows = data.rows;
        table.data = table.parse(table.columns, table.rows);

        // callback
        if (callback) {
            callback(null, data);
        }
    });

};

FusionTable.prototype.query = function(sql, callback) {
    var base = "https://www.googleapis.com/fusiontables/v1/query?"
      , url = base + $.param({sql: sql, key: this.apikey });

    return $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(data, status, jqXHR) {
            if (callback) { return callback(null, data, status, jqXHR); }
        },
        error: function(jqXHR, msg, error) {
            if (callback) { return callback(error, jqXHR, msg); }
        }
    });
};

FusionTable.prototype.parse = function(columns, rows) {
    // build a JSON dataset with columns and rows
    return _.map(rows, function(row) {
        var obj = {};
        for (var i in row) {
            obj[columns[i]] = row[i];
        }

        return obj;
    });
};

FusionTable.prototype.render = function(selector, columns) {
    var root = $(selector);

    var table = $(JST.table({
        data: this.data,
        table_id: this.table_id,
        columns: columns || this.columns
    })).appendTo(root);

    root.find('table.sortable').tablesorter({
        widthFixed: true
    })
    .tablesorterPager({
        container: root.find(".pager"),
        positionFixed: false,
        size: 25
    })
    .tablesorterMultiPageFilter({
        filterSelector: root.find('.table-filter input')
    });
    
    return this;
};

/*** TODO
* add jQuery plugin

$(parent_el).fusiontable({
    apikey: api_key,
    table: table_id,
    columns: [list, of, column, names]
});
***/


