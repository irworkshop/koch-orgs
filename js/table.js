;jQuery(function($) {

var TABLE = {
    key: '0AprNP7zjIYS1dHB5S1JDd0RWeGkwOWRhYzFKSHRzblE',
    wanted: ['Political Giving'],
    callback: render,
    columns: ['nameofrecipient', 'charity', 'purpose', 'totalfunding']
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
    totalfunding: "Total Funding"
}

function render(data, tabletop) {
    var root = $('body')
      , sheet = data[TABLE.wanted[0]]

    $(JST.table({
        data: sheet.elements,
        table_id: tabletop.key,
        columns: TABLE.columns || sheet.column_names,
        rename: rename
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

}

var table = new Tabletop(TABLE);

window.table = table;
window.TABLE = TABLE;

});