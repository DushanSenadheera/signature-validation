const fs = require('fs');
const crypto = require('crypto');

const privateKey = fs.readFileSync('private-key.pem', 'utf-8');
const publicKey = fs.readFileSync('public-key.pem', 'utf-8');

const createSignature = (text) => {
    const sign = crypto.createSign('RSA-SHA256');
    let signedtext = sign.update(text);
    let encryptedValue = signedtext.sign(privateKey, 'base64');
    return encryptedValue;
}

const validateSignature = (text, signature) => {
    const verifySign = crypto.createVerify('RSA-SHA256');
    let verifiedtext = verifySign.update(text);
    let isVerified = verifiedtext.verify(publicKey, signature, 'base64');
    return isVerified;
}

const text = 'hello world';
const signature = createSignature(text);
const isSignatureValid = validateSignature(text, signature);

console.log(`Generated Signature: ${signature} and Signature verification is ${isSignatureValid}`)