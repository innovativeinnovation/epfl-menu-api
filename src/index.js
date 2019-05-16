/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const querystring = require('querystring');
const moment = require('moment');
const got = require('got');

const MENUS_URL = 'https://menus.epfl.ch/cgi-bin/ws-getMenus';
const RESTOS_URL = 'https://menus.epfl.ch/cgi-bin/ws-getRestos';

const DEFAULT_MENUS_OPTIONS = {
  language: 'en',
  partOfDay: 'midi'
};

const TAGS = {
  'Volaille': 'Chicken',
  'Chinois': 'Chinese',
  'Poisson': 'Fish',
  'Fourchette Verte': 'Green Fork',
  'Indian': 'Indien',
  'Japonais': 'Japanese',
  'Libanais': 'Lebanese',
  'Viande': 'Meat',
  'Pâtes': 'Pasta',
  'Pizza': 'Pizza',
  'Thaï': 'Thai',
  'Végétalien': 'Vegan',
  'Végétarien': 'Vegetarian'
};

let buildMenuUrl = (opts) => {
  var queryParameters = {
    'midisoir': opts.partOfDay,
    'resto_id': opts.restoId,
    'lang': opts.language,
    'date': opts.date,
    'tags': opts.tags
  };

  return MENUS_URL + '?' + querystring.stringify(queryParameters);
};

let buildRestoUrl = (id) => {
  var queryParameters = {
    'resto_id': id
  };

  return RESTOS_URL + '?' + querystring.stringify(queryParameters);
};

let escapeTab = (jsonString) => {
  return jsonString.replace(/\t/g, '\\t');
};

let splitTags = (strTags) => {
  let listTags = strTags.split(',');
  return listTags.map(tag => tag.trim());
};

let checkTags = (listTags) => {
  let isValid = true;
  let validTags = Object.keys(TAGS);
  for (var i = 0; i < listTags.length; i++) {
    if (!validTags.includes(listTags[i])) {
      isValid = false;
    }
  }
  return isValid;
};

let findMenu = (opts = DEFAULT_MENUS_OPTIONS) => {
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

  if (opts.tags) {
    let listTags = splitTags(opts.tags);
    if (!checkTags(listTags)) {
      return Promise.reject(new TypeError('Not a valid tags'));
    }
    opts.tags = listTags.join(',');
  }

  return getMenu(opts);
};

let getMenu = async function (opts) {
  if (opts.restoId && isNaN(opts.restoId)) {
    return Promise.reject(new TypeError('Not a valid restoId'));
  }
  let resto = await findResto(opts.restoId);
  if (resto.length > 0) {
    const url = buildMenuUrl(opts);
    return promGetMenu(url);
  }
  return Promise.reject(new TypeError('Not a valid restoId'));
};

let promGetMenu = (url) => {
  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      let jsonString = escapeTab(response.body);
      const data = JSON.parse(jsonString);
      resolve(data.menus);
    }).catch((err) => reject(err));
  });
};

let findResto = (id) => {
  const url = buildRestoUrl(id);
  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      resolve(data.restos);
    }).catch((err) => reject(err));
  });
};

exports.translateTags = (strTags) => {
  if (!strTags) {
    throw new TypeError('Not a valid tags');
  }

  let listTags = splitTags(strTags);
  let translatedList = [];
  for (var i = 0; i < listTags.length; i++) {
    if (TAGS[listTags[i]]) {
      translatedList.push(TAGS[listTags[i]]);
    } else {
      translatedList.push(listTags[i]);
    }
  }
  return translatedList.join(',');
};

exports.findMenu = findMenu;
exports.findResto = findResto;
