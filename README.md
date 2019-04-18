<p align="center">
  <img alt="EPFL Menu API" src="https://raw.githubusercontent.com/innovativeinnovation/epfl-menu-api/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  EPFL Menu API.
</p>

<p align="center">
  <a href="https://travis-ci.org/innovativeinnovation/epfl-menu-api">
    <img alt="Travis Status" src="https://travis-ci.org/innovativeinnovation/epfl-menu-api.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/innovativeinnovation/epfl-menu-api?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/innovativeinnovation/epfl-menu-api/badge.svg?branch=master"/>
  </a>
  <a href="https://david-dm.org/innovativeinnovation/epfl-menu-api">
    <img alt="Dependency Status" src="https://david-dm.org/innovativeinnovation/epfl-menu-api/status.svg"/>
  </a>
  <a href="https://raw.githubusercontent.com/innovativeinnovation/epfl-menu-api/master/LICENSE">
    <img alt="Apache License 2.0" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
  </a>
  <a href='https://www.npmjs.com/package/epfl-menu-api'>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/epfl-menu-api.svg" />
  </a>
</p>

---

Install
-------

```bash
npm i epfl-menu-api --save
```

Usage
-----

```javascript
var epflMenuApi = require('epfl-menu-api');

epflMenuApi.findMenu().then(function(menus) {
  console.log(menus[0].restoName);      //=> 'Le Corbusier'
  console.log(menus[0].menuType);       //=> 'Hamburger'
  console.log(menus[0].menuTags);       //=> 'Viande'
  console.log(menus[0].accompLegumes);  //=> 'Frites - Salade'
}).catch(function(err) {
  console.log(err);
});

epflMenuApi.findMenu('soir', 'fr').then(function(menus) {
  console.log(menus[0].restoName);  //=> 'La Table de Vallotton by Shangri-La'
  console.log(menus[0].menuType);   //=> 'Take away 1'
  console.log(menus[0].menuTags);   //=> 'Chinois'
}).catch(function(err) {
  console.log(err);
});
```

API
---

### .findMenu(partOfDay, language)

Type: `function`

Returns a Promise with a list of menu as parameter.

##### partOfDay

Type: `string`<br>
Default: `midi`

Part of the day. Could be midday (`midi`) or evening (`soir`).

##### language

Type: `string`<br>
Default: `en`

Supported language are English(`en`) and French(`fr`).

See also
--------

* [epfl-menu](https://github.com/gcmalloc/epfl-menu)

Contributing
------------

Contributions are always welcome.

See [Contributing](CONTRIBUTING.md).

Developer
---------

  * [William Belle](https://github.com/williambelle)

License
-------

Apache License 2.0

(c) William Belle, 2019.

See the [LICENSE](LICENSE) file for more details.
