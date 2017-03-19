var data = require('./data.json');

var r_prefix = /\+?(\d{1,3})/;
var r_iso = /([A-Z]{2,3})/;
var r_cuntry = /([A-Za-z ]{3,})/;
var r_lang = /en|es|fr/;

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.rmspaces = function () {
  return this.replace(' ', '');
}

String.prototype.normal = function () {
  return this.replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function (str, a, c, e, i, n, o, s, u, y, ae) {
    if (a) return 'a';
    else if (c) return 'c';
    else if (e) return 'e';
    else if (i) return 'i';
    else if (n) return 'n';
    else if (o) return 'o';
    else if (s) return 's';
    else if (u) return 'u';
    else if (y) return 'y';
    else if (ae) return 'ae';
  });
}

function Prefixnum(str_in) {

  this.type = -1;
  this.in = "";
  this.lang = 'en';

  if (typeof str_in == 'string' || typeof str_in == 'number') {
    this.in = str_in.capitalize().rmspaces().normal();
    //console.log(str_in)
    if (r_prefix.test(this.in)) {
      //"Prefijo";
      this.in = r_prefix.exec(this.in)[1];
      this.type = 0;
    } else if (r_iso.test(this.in)) {
      //"ISO";
      this.type = 1;
    } else if (r_cuntry.test(this.in)) {
      //"Ciudad";
      this.type = 2;
    }
  }
  return this.in;
}

Prefixnum.prototype.toISO = function () {
  var _iso = undefined;
  if (this.in) {
    if (this.type == 0) { //"Prefijo";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.code == this.in 
            || key.normal().capitalize().rmspaces() == this.in
            || element.nom.normal().capitalize().rmspaces() == this.in) {
            return element.iso2;
          }
        }
      }
    } else if (this.type == 1) { //"ISO";
      return this.in;
    } else if (this.type == 2) { //"Ciudad";
       for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.code == this.in 
            || key.normal().capitalize().rmspaces() == this.in
            || element.nom.normal().capitalize().rmspaces() == this.in) {
            return element.iso2;
          }
        }
      }
    }
  }
  return _iso;
}

Prefixnum.prototype.toISO3 = function () {
  var _iso = undefined;
  if (this.in) {
    if (this.type == 0) { //"Prefijo";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.code == this.in) {
            return element.iso3;
          }
        }
      }
    } else if (this.type == 2 || this.type == 1) { //"Ciudad";
       for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.code == this.in 
            || key.normal().capitalize().rmspaces() == this.in
            || element.nom.normal().capitalize().rmspaces() == this.in
            || element.iso2 == this.in
            || element.iso3 == this.in) {
            return element.iso3;
          }
        }
      }
    }
  }
  return _iso;
}

Prefixnum.prototype.toCountry = function () {
  var _iso = undefined;
  if (this.in) {
    if (this.type == 0) { //"Prefijo";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.code == this.in) {
            return this.lang == 'es' ? key : this.lang == 'en' ? element.name : element.nom;
          }
        }
      }
    } else if (this.type == 1) { //"ISO";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.iso2 == this.in) {
            return this.lang == 'es' ? key : this.lang == 'en' ? element.name : element.nom;
          }
        }
      }
    } else if (this.type == 2) { //"Ciudad";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.name.toLowerCase() == this.in.toLowerCase() 
            || element.nom.normal().capitalize().rmspaces() == this.in
            || element.name.normal().capitalize().rmspaces() == this.in
            || key.rmspaces().capitalize().normal() == this.in
          ) {
            return this.lang == 'es' ? key : this.lang == 'en' ? element.name : element.nom;
          }
        }
      }
    }
  }
  return _iso;
}

Prefixnum.prototype.toPrefix = function () {
  var _iso = undefined;
  if (this.in) {
    if (this.type == 0) { //"Prefijo";
      return this.in;
    } else if (this.type == 1) { //"ISO";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.iso2 == this.in || element.iso3 == this.in) {
            return element.code;
          }
        }
      }
    } else if (this.type == 2) { //"Ciudad";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var element = data[key];
          if (element.name.rmspaces().capitalize().normal() == this.in || element.nom.rmspaces().normal() == this.in || key.rmspaces().normal() == this.in) {
            return element.code;
          }
        }
      }
    }
  }
  return _iso;
}

Prefixnum.prototype.language = function (input_lang) {
  if (typeof input_lang == 'string') {
    input_lang = input_lang.toLowerCase();
    if (r_lang.test(input_lang)) {
      this.lang = input_lang;
    }
  }
}

module.exports = Prefixnum;