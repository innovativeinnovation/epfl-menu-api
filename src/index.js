/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const got = require('got');

const MENUS_URL = 'https://menus.epfl.ch/cgi-bin/ws-getMenus';

const DEFAULT_MENUS_OPTIONS = {
  language: 'en',
  partOfDay: 'midi'
};

let buildMenuUrl = (opts) => {
  var queryParameters = '?midisoir=' + opts.partOfDay +
    '&lang=' + opts.language;
  if (opts.restoId) {
    queryParameters += '&resto_id=' + opts.restoId;
  }
  if (opts.date) {
    queryParameters += '&date=' + opts.date;
  }
  if (opts.tags) {
    queryParameters += '&tags=' + opts.tags;
  }
  return MENUS_URL + queryParameters;
};

exports.findMenu = (opts = DEFAULT_MENUS_OPTIONS) => {
  opts.language = opts.language || DEFAULT_MENUS_OPTIONS.language;
  opts.partOfDay = opts.partOfDay || DEFAULT_MENUS_OPTIONS.partOfDay;

  const url = buildMenuUrl(opts);
  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      resolve(data.menus);
    }).catch((err) => reject(err));
  });
};
