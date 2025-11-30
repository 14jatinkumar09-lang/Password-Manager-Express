const crypto = require("crypto");

const ALGO = "aes-256-gcm"; // Authenticated encryption
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32 bytes

function encrypt(plainText) {
  const iv = crypto.randomBytes(12); // 96-bit nonce for GCM
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // store iv + authTag + cipher text, all as base64
  return {
    iv: iv.toString("base64"),
    content: encrypted.toString("base64"),
    tag: authTag.toString("base64"),
  };
}

function decrypt(encryptedObj) {
  const { iv, content, tag } = encryptedObj;

  const decipher = crypto.createDecipheriv(
    ALGO,
    KEY,
    Buffer.from(iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(tag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

module.exports = { encrypt, decrypt };
