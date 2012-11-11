/**
 *  Test code for node-l10n.
 *
 *  Uses a different require format to example.js.
 *  
 **/

define(function(require) {
  var l10n = require('lib/l10n');
  var l10nBrowser = require('lib/l10n-browser');
  var getString = require('getString');
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
      adj=getString(adjKey, {'n':n}, 'colour');
      appendElt(elt,'li',getString('phrase',{'n':n, 'adj':adj}, 'brown fox phrase'));
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
  l10n.setAdapter(l10n_browser, {baseURL: 'locales/'});
  window.onload = function() {
    // do the tests.
    outputElt = document.getElementById('output'); 
    testLanguage('en', function() {
      testLanguage('de');
    });
  }
});

