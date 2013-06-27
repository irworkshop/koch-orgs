;jQuery(function($) {

var TABLE = {
    key: '0AprNP7zjIYS1dFdmOHdzSnpjTnJEMVB6bGpDaGhsU1E',
    wanted: ['Clean Pols'],
    callback: render,
    columns: ['nameofrecipient', 'charity', 'purpose', 'totalfunding'],
    parseNumbers: true,
    postProcess: postProcess
}

var rename = {
    charity: "Charity",
    funding: "2011 Funding",
    funding_2: "2010 Funding",
    funding_3: "2009 Funding",
    funding_4: "2008 Funding",
    funding_5: "2007 Funding",
    nameofrecipient: "Name of Recipient",
    other: "Other",
    purpose: "Purpose",
    rowNumber: "row",
    totalfunding: "Total Funding 2007-2011"
}

function intcomma(value) {
    // inspired by django.contrib.humanize.intcomma
    var origValue = String(value);
    var newValue = origValue.replace(/^(-?\d+)(\d{3})/, '$1,$2');
    if (origValue == newValue){
        return newValue;
    } else {
        return intcomma(newValue);
    }
};

function render(data, tabletop) {
    var root = $('body')
      , sheet = data[TABLE.wanted[0]]

    var table = $(JST.table({
        data: sheet.elements,
        table_id: tabletop.key,
        columns: TABLE.columns || sheet.column_names,
        rename: rename
    }));

    root.html(table);

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
}

function postProcess(element) {
    element['totalfunding'] = '$' + intcomma(element['totalfunding']);
}

var table = new Tabletop(TABLE);

window.table = table;
window.TABLE = TABLE;

});