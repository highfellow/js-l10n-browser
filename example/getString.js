
/* this code split off just to check whether multiple
 * requires of l10n.js work OK */

var getString = function(key, args, fallback) {
    return l10n.get(key, args, fallback);
  }

define(['lib/l10n'], function(l10n) {
  return getString});
