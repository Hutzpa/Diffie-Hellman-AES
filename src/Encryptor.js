const crypto = require('crypto');


function encrypt(string,key ,iv) {
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(string, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    
  return encrypted;
}

function decrypt(string, key,iv) {
  console.log(`iv - ${iv} | length - ${iv.length}`)
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(string, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
  return decrypted;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
