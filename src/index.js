/*
 * (c) William Belle, 2019.
 * See the LICENSE file for more details.
 */

const got = require('got');

const MENUS_URL = 'https://menus.epfl.ch/cgi-bin/ws-getMenus';

exports.findMenu = () => {
  return new Promise((resolve, reject) => {
    got(MENUS_URL).then((response) => {
      const data = JSON.parse(response.body);
      resolve(data.menus);
    }).catch((err) => reject(err));
  });
};
