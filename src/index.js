/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const moment = require('moment');
const got = require('got');

const MENUS_URL = 'https://menus.epfl.ch/cgi-bin/ws-getMenus';
const RESTOS_URL = 'https://menus.epfl.ch/cgi-bin/ws-getRestos';

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

let buildRestoUrl = (id) => {
  var queryParameters = '';
  if (id) {
    queryParameters = '?resto_id=' + id;
  }
  return RESTOS_URL + queryParameters;
};

let escapeTab = (jsonString) => {
  return jsonString.replace(/\t/g, '\\t');
};

exports.findMenu = (opts = DEFAULT_MENUS_OPTIONS) => {
  opts.language = opts.language || DEFAULT_MENUS_OPTIONS.language;
  opts.partOfDay = opts.partOfDay || DEFAULT_MENUS_OPTIONS.partOfDay;

  if (opts.language !== 'en' && opts.language !== 'fr') {
    return Promise.reject(new TypeError('Language not supported'));
  }

  if (opts.partOfDay !== 'midi' && opts.partOfDay !== 'soir') {
    return Promise.reject(new TypeError('Part of the day not supported'));
  }

  if (opts.date && !moment(opts.date, 'DD/MM/YYYY', true).isValid()) {
    return Promise.reject(new TypeError('Not a valid date'));
  }

  const url = buildMenuUrl(opts);
  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      let jsonString = escapeTab(response.body);
      const data = JSON.parse(jsonString);
      resolve(data.menus);
    }).catch((err) => reject(err));
  });
};

exports.findResto = (id) => {
  const url = buildRestoUrl(id);
  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      resolve(data.restos);
    }).catch((err) => reject(err));
  });
};
