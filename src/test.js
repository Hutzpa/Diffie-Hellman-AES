const Encryptor = require('./Encryptor');
const crypto = require('crypto');


let key ='12345678123456781234567812345678';

let mes = 'Backed by OpenSSL, Node.js crypto module can do some pretty cool stuff.';

let enc = Encryptor.encrypt(mes,key,iv);

console.log(enc);

let dec = Encryptor.decrypt(enc,key,iv);

console.log(dec);