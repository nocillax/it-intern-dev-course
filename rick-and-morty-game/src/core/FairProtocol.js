import crypto from "crypto";
import KeyManager from "./KeyManager.js";

// Provably Fair Protocol: HMAC-SHA3 with secure keys for fair random generation
export default class FairProtocol {
  static initializeProtocol(range) {
    if (!Number.isInteger(range) || range < 1) {
      throw new Error("Range must be a positive integer");
    }

    const secretKey = KeyManager.generateSecureKey();
    const mortyValue = crypto.randomInt(0, range);

    const hmac = crypto.createHmac("sha3-256", secretKey);
    hmac.update(mortyValue.toString());
    const hmacDigest = hmac.digest("hex").toUpperCase();

    return {
      secretKey,
      mortyValue,
      hmacDigest,
      range,
    };
  }

  static completeProtocol(session, rickValue) {
    if (!session) {
      throw new Error("Invalid protocol session");
    }

    if (
      !Number.isInteger(rickValue) ||
      rickValue < 0 ||
      rickValue >= session.range
    ) {
      throw new Error(
        `Rick's value must be integer in range [0, ${session.range})`
      );
    }

    const finalResult = (session.mortyValue + rickValue) % session.range;

    return {
      ...session,
      rickValue,
      finalResult,
      secretKeyHex: KeyManager.formatKeyAsHex(session.secretKey),
    };
  }
}
