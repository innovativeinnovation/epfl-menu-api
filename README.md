<p align="center">
  <img alt="EPFL Menu API" src="https://raw.githubusercontent.com/innovativeinnovation/epfl-menu-api/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  EPFL Menu API.
</p>

<p align="center">
  <a href="https://github.com/innovativeinnovation/epfl-menu-api/actions">
    <img alt="Build Status" src="https://github.com/innovativeinnovation/epfl-menu-api/workflows/Build/badge.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/innovativeinnovation/epfl-menu-api?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/innovativeinnovation/epfl-menu-api/badge.svg?branch=master"/>
  </a>
  <a href="https://david-dm.org/innovativeinnovation/epfl-menu-api">
    <img alt="Dependencies Status" src="https://david-dm.org/innovativeinnovation/epfl-menu-api/status.svg"/>
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
const epflMenuApi = require('epfl-menu-api');

epflMenuApi.findMenu().then(function(menus) {
  console.log(menus[0].restoName);      //=> 'Le Corbusier'
  console.log(menus[0].menuType);       //=> 'Hamburger'
  console.log(menus[0].menuTags);       //=> 'Viande'
  console.log(menus[0].accompLegumes);  //=> 'Frites - Salade'
}).catch(function(err) {
  console.log(err);
});

epflMenuApi.findMenu({
  language: 'fr',
  partOfDay: 'soir',
  date: '18/04/2019',
  tags: 'Viande,Poisson,Japonais'
}).then(function(menus) {
  console.log(menus[0].restoName);  //=> 'La Table de Vallotton by Shangri-La'
  console.log(menus[0].menuType);   //=> 'Take away 2'
  console.log(menus[0].menuTags);   //=> 'Chinois,Viande'
}).catch(function(err) {
  console.log(err);
});

epflMenuApi.findResto().then(function(restos) {
  console.log(restos[0].restoName);  //=> 'L'Esplanade'
  console.log(restos[0].restoID);    //=> '32'
  console.log(restos[0].type);       //=> 'self-service'
  console.log(restos[0].plan);       //=> 'CO160'
}).catch(function(err) {
  console.log(err);
});

const tags = epflMenuApi.translateTags('Poisson,Viande,Chinois');
console.log(tags);  //=> 'Fish,Meat,Chinese'
```

API
---

### .findMenu([options])

Type: `function`

Returns a Promise with a list of menu as parameter.

##### options

Type: `object`

Any of the following options.

###### partOfDay

Type: `string`  
Default: `midi`

Part of the day. Could be midday (`midi`) or evening (`soir`).

###### language

Type: `string`  
Default: `en`

Supported languages are English (`en`) and French (`fr`).

###### restoId

Type: `number`

Restaurant id.

###### date

Type: `date`

Date. Example: `18/04/2019`.

###### tags

Type: `string`

A comma separated list of menu types. Available tags:

* `Chicken` or `Volaille`
* `Chinese` or `Chinois`
* `Fish` or `Poisson`
* `Green Fork` or `Fourchette Verte`
* `Indian` or `Indien`
* `Japanese` or `Japonais`
* `Lebanese` or `Libanais`
* `Meat` or `Viande`
* `Pasta` or `Pâtes`
* `Pizza` or `Pizza`
* `Thai` or `Thaï`
* `Vegan` or `Végétalien`
* `Vegetarian` or `Végétarien`

### .findResto([id])

Type: `function`

Returns a Promise with a list of restaurant as parameter.

##### options

Type: `object`

Any of the following options.

###### id

Type: `number`

Restaurant id.

### .translateTags(str)

Type: `function`

Translate tags from French to English.

##### str

Type: `string`

Tags to translate.

See also
--------

* [eat-at-epfl](https://github.com/innovativeinnovation/eat-at-epfl)
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

(c) William Belle, 2019-2020.

See the [LICENSE](LICENSE) file for more details.
