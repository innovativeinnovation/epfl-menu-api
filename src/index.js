/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const got = require('got');

const MENUS_URL = 'https://menus.epfl.ch/cgi-bin/ws-getMenus';

let buildMenuUrl = (partOfDay, language) => {
  const queryParameters = '?midisoir=' + partOfDay + '&lang=' + language;
  return MENUS_URL + queryParameters;
};

exports.findMenu = (partOfDay = 'midi', language = 'en') => {
  const url = buildMenuUrl(partOfDay, language);

  return new Promise((resolve, reject) => {
    got(url).then((response) => {
      const data = JSON.parse(response.body);
      resolve(data.menus);
    }).catch((err) => reject(err));
  });
};
