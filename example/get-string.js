
/* this code split off just to check whether multiple
 * requires of l10n.js work OK */

define(function(require) {
  var l10n = require('lib/l10n');
  return function(key, args, fallback) {
    return l10n.get(key, args, fallback);
  }
});
