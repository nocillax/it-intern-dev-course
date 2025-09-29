import crypto from "crypto";

// Cryptographic key management - 256-bit secure keys
export default class KeyManager {
  static generateSecureKey() {
    return crypto.randomBytes(32); // 256-bit key
  }

  static formatKeyAsHex(key) {
    return key.toString("hex").toUpperCase();
  }
}
