import CryptoJS from "crypto-js";
export const key = "hTHjrZLO2fa+ISZ4hTHjrZLO2fa+ISZ4";
export const IV = "FgUkMTEDQlQP9qil";
// export const key = "avB1Po/hEgbPMvHf";
// export const IV = "+QVQirIkLgxvVUs3";
export const secretKey = CryptoJS.enc.Utf8.parse(key);
export const intiVector = CryptoJS.enc.Utf8.parse(IV);
export const encryptHandler = (data) => {
  const preEncrypteds = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
    iv: intiVector,
    mode: CryptoJS.mode.CBC,
    keySize: 128 / 8,
  });
  const result = preEncrypteds.toString(CryptoJS.format.Hex);
  return result;
};
export const decryptHandler = (data) => {
  const dataHex = CryptoJS.enc.Hex.parse(data);
  const preDecrypted = CryptoJS.AES.decrypt(
    { ciphertext: dataHex },
    secretKey,
    { iv: intiVector, mode: CryptoJS.mode.CBC, keySize: 128 / 8 }
  );
  const encDecrypted = preDecrypted.toString(CryptoJS.enc.Utf8);
  // const decrypted = JSON.parse(encDecrypted)
  const decrypted = encDecrypted;
  return decrypted;
};
