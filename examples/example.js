var Prefixnum = require('../index');

var prefix = new Prefixnum("+57");
prefix.language('es');

console.log("Prefix to ISO:\t\t", prefix.toISO());
console.log("Prefix to ISO3:\t\t", prefix.toISO3());
console.log("Prefix to country:\t", prefix.toCountry());
console.log("Prefix to country:\t", prefix.toPrefix());


console.log(".........................")


var prefix = new Prefixnum("Australia");

console.log("Country to ISO:\t\t", prefix.toISO());
console.log("Country to ISO3:\t", prefix.toISO3());
console.log("Country to prefix:\t", prefix.toPrefix());
console.log("Country to country:\t", prefix.toCountry());


console.log(".........................")


var prefix = new Prefixnum("BG");
prefix.language('en');

console.log("ISO to ISO:\t", prefix.toISO());
console.log("ISO to ISO3:\t", prefix.toISO3());
console.log("ISO to prefix:\t", prefix.toPrefix());
console.log("ISO to country:\t", prefix.toCountry());



var prefix = new Prefixnum("United States of America");
prefix.language('fr');

console.log(prefix.toCountry());  //=> 

prefix.language('es');

console.log(prefix.toCountry());  //=> 