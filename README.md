# prefix-number

Get the name of the country in three different languages, the prefix and the ISO.

```sh
$ npm install --save prefix-number
```

## Usage

### By prefix 

Import
```js
var Prefixnum = require('prefix-number');
```

```js
var prefix = new Prefixnum("+57");

console.log(prefix.toISO());      //=> CO
console.log(prefix.toISO3());     //=> COL
console.log(prefix.toCountry());  //=> Colombia
console.log(prefix.toPrefix());   //=> 57
```

### By name

```js
var prefix = new Prefixnum("Australia");

console.log(prefix.toISO());      //=> AU
console.log(prefix.toISO3());     //=> AUS
console.log(prefix.toPrefix());   //=> 61
```

### By ISO

```js
var prefix = new Prefixnum("BG");

console.log(prefix.toISO());      //=> BG
console.log(prefix.toISO3());     //=> BGR
console.log(prefix.toCountry());  //=> Bulgaria
console.log(prefix.toPrefix());   //=> 359
```

### Change language
Available in Spanish, English and French. Default `en`.
```js
var prefix = new Prefixnum("United States of America");

prefix.language('es');  // es|en|fr
console.log(prefix.toCountry());  //=> Estados Unidos de América

prefix.language('fr');  // es|en|fr
console.log(prefix.toCountry());  //=> États-Unis d'Amérique
```

### LICENSE
MIT