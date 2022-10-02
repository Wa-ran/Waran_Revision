const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'aRandomSecretKeyWithNumbersLike1';
const iv = Buffer.alloc(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString('hex')
};

const decrypt = (hash) => {
  try {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
    if (decrypted.toString() === '' || decrypted.toString() === '�' || encodeURI(decrypted.toString()).length < hash.length / 2.5) throw error
    return decrypted.toString();
  } catch (error) {
    return hash
  }
};

module.exports = {
  encrypt,
  decrypt
};