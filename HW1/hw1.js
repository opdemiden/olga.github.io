const quotesAddress = "https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json";
var quotes = [];
var groups = [];

window.onload = init;

function init() {
    loadJSON(function (response) {
        quotes = JSON.parse(response);
        getQuote();

        quotes.forEach(function (item, i, quotes) {
            if (!groups.hasOwnProperty(item.quoteAuthor)) {
                groups[item.quoteAuthor] = {
                    quoteAuthor: item.quoteAuthor,
                    quotesTexts: [{
                        quoteAuthor: item.quoteAuthor,
                        quoteText: item.quoteText
                    }]
                };
                addSelectBoxById("selAthors", item.quoteAuthor, item.quoteAuthor);
            }
            groups[item.quoteAuthor].quotesTexts.push({
                quoteAuthor: item.quoteAuthor,
                quoteText: item.quoteText
            });
        });
    });
}


function getQuote() {
    var quoteID = GetQuoteRId(quotes);
    var cQuote = quotes[quoteID].quoteText;
    document.getElementById('QOD_text_area').innerHTML = cQuote;
}

function GetQuoteRId(q) {
    var quoteID = Math.floor(Math.random() * (q.length));
    return quoteID;
}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', quotesAddress, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function addSelectBoxById(eid, value, text) {
    //var el = document.getElementById(eid);
    //appendHtml(el, "<option value='" + value + "'>" + text + "</option>");
    var elem = document.createElement("option");
    elem.value = value;
    elem.innerHTML = text;
    document.getElementById(eid).appendChild(elem)
};

function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}

var setAthorButton = document.getElementById('setAthor');

//var authorList = document.getElementById('selAthors');

function getSelAuthorQuote() {
    var x = document.getElementById("selAthors").options[document.getElementById("selAthors").selectedIndex].value;
    //var x = document.getElementById("selAthors").selectedIndex;
    //console.log(x);
    var squotesTexts = groups[x].quotesTexts;
    //console.log(JSON.stringify(squotesTexts));
    var quoteID = GetQuoteRId(squotesTexts);
    //console.log(quoteID);
    var saQuote = squotesTexts[quoteID].quoteText;
    //console.log(saQuote);
    document.getElementById('QOD_text_area').innerHTML = saQuote;
}