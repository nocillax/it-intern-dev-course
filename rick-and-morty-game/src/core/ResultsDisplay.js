/**
 * ResultsDisplay - Handles all result presentation and revelation
 * Single Responsibility: Displaying game results and protocol details
 */
export default class ResultsDisplay {
  /**
   * Display protocol revelation details
   */
  displayProtocolResults(
    protocol1Complete,
    protocol2Complete,
    numBoxes,
    secondRange,
    portalGunBox
  ) {
    console.log(
      `Morty: Aww man, my 1st random value is ${protocol1Complete.mortyValue}.`
    );
    console.log(`Morty: KEY1=${protocol1Complete.secretKeyHex}`);
    console.log(
      `Morty: So the 1st fair number is (${protocol1Complete.rickValue} + ${protocol1Complete.mortyValue}) % ${numBoxes} = ${portalGunBox}.`
    );

    if (protocol2Complete) {
      console.log(
        `Morty: Aww man, my 2nd random value is ${protocol2Complete.mortyValue}.`
      );
      console.log(`Morty: KEY2=${protocol2Complete.secretKeyHex}`);
      console.log(
        `Morty: Uh, okay, the 2nd fair number is (${protocol2Complete.rickValue} + ${protocol2Complete.mortyValue}) % ${secondRange} = ${protocol2Complete.finalResult}`
      );
    }

    console.log(`Morty: You portal gun is in the box ${portalGunBox}.`);
  }

  /**
   * Display win/loss result
   */
  displayGameResult(rickWon) {
    if (rickWon) {
      console.log(
        "Morty: Aww man, you won, Rick! I guess we're going on one of your adventures..."
      );
    } else {
      console.log(
        "Morty: Aww man, you lost, Rick. Now we gotta go on one of _my_ adventures!"
      );
    }
  }

  /**
   * Display final statistics
   */
  displayFinalStats(statsTable) {
    console.log("\n                  GAME STATS\n");
    console.log(statsTable);
  }

  /**
   * Display protocol initiation messages
   */
  displayProtocolStart(numBoxes, hmacDigest, protocolNumber = 1) {
    if (protocolNumber === 1) {
      console.log(
        `Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the ${numBoxes} boxes, okay?`
      );
      console.log(`Morty: HMAC1=${hmacDigest}`);
      console.log(
        `Morty: Rick, enter your number [0,${numBoxes}) so you don't whine later that I cheated, alright?`
      );
    } else {
      console.log(
        "Morty: Let's, uh, generate another value now, I mean, to select a box to keep in the game."
      );
      console.log(`Morty: HMAC2=${hmacDigest}`);
      console.log(
        `Morty: Rick, enter your number [0,${numBoxes}) and, uh, don't say I didn't play fair, okay?`
      );
    }
  }

  /**
   * Display final choice options
   */
  displayFinalChoiceOptions(rickGuess, otherBox) {
    console.log(
      `Morty: I'm keeping the box you chose, I mean ${rickGuess}, and the box ${otherBox}.`
    );
    console.log(
      `Morty: You can switch your box (enter ${otherBox}), or, you know, stick with it (enter ${rickGuess}).`
    );
  }

  /**
   * Display general messages
   */
  displayMessage(message) {
    console.log(message);
  }
}
