/**
 *  Test code for node-l10n.
 **/

var l10n = null;
var outputElt = null;

function appendElt(elt, type, content) {
  // add an element to elt and fill it.
  var newElt = document.createElement(type);
  newElt.textContent = content;
  elt.appendChild(newElt);
  return(newElt);
}

// run through plurals using a given adjective.
function repeat(elt,adjKey) {
  var adj;
  for (var n = 0; n < 4; n++) {
    adj=l10n.get(adjKey, {'n':n}, 'colour');
    appendElt(elt,'li',l10n.get('phrase',{'n':n, 'adj':adj}, 'brown fox phrase'));
  }
}

// test in a given language.
function testLanguage(lang, callback) {
  var h2 = appendElt(outputElt, 'h2', 'Language:' + lang)
  l10n.loadResource('data.properties', lang, function() {
    var h3 = appendElt(h2, 'h3', 'Usual version');
    var p = appendElt(h2, 'p', '');
    var ul = appendElt(p, 'ul', '');
    repeat(ul, 'brown');
    h3 = appendElt(h2, 'h3', 'With parameter substitution');
    p = appendElt(h2, 'p', '');
    ul = appendElt(p, 'ul', '');
    repeat(ul, 'pink');
    callback && callback();
  },
  function(err) {
    console.log('Failed to load data.properties');
  });
}

window.onload = function() {
  requirejs(['lib/l10n','lib/l10n-browser'],
      function(L10n, L10n_Browser) {
        // initialise L10n with the browser adapter.
        l10n = new L10n(new L10n_Browser());
        // do the tests.
        outputElt = document.getElementById('output'); 
        testLanguage('en', function() {
          testLanguage('de');
        });
      });
}
