import FairProtocol from "./FairProtocol.js";
import UserInterface from "./UserInterface.js";
import ResultsDisplay from "./ResultsDisplay.js";

/**
 * GameEngine - Orchestrates the game flow and coordinates between components
 * Single Responsibility: Game flow control and component coordination
 */
export default class GameEngine {
  constructor(numBoxes, mortyImplementation, statisticsCollector) {
    this.numBoxes = numBoxes;
    this.morty = mortyImplementation;
    this.stats = statisticsCollector;
    this.ui = new UserInterface();
    this.display = new ResultsDisplay();
  }

  /**
   * Run the main game loop
   */
  async startGame() {
    while (true) {
      this.playRound();

      this.display.displayMessage(
        "Morty: D-do you wanna play another round (y/n)?"
      );
      const playAgain = this.ui.getValidatedYesNo("Rick: ");

      if (!playAgain) {
        this.display.displayMessage("Morty: Okay… uh, bye!");
        break;
      }
    }

    this.display.displayFinalStats(
      this.stats.generateTable(this.morty, this.numBoxes)
    );
  }

  /**
   * Play a single round of the game
   */
  playRound() {
    // Step 1: First protocol - hide portal gun
    const protocol1Session = FairProtocol.initializeProtocol(this.numBoxes);
    this.display.displayProtocolStart(
      this.numBoxes,
      protocol1Session.hmacDigest,
      1
    );

    const rickValue1 = this.ui.getValidatedInput("Rick: ", 0, this.numBoxes);
    const protocol1Complete = FairProtocol.completeProtocol(
      protocol1Session,
      rickValue1
    );
    const portalGunBox = protocol1Complete.finalResult;

    // Step 2: Rick's initial guess
    this.display.displayMessage(
      `Morty: Okay, okay, I hid the gun. What's your guess [0,${this.numBoxes})?`
    );
    const rickGuess = this.ui.getValidatedInput("Rick: ", 0, this.numBoxes);

    // Step 3: Morty decides which boxes to keep
    const decision = this.morty.decideBoxToKeep(
      rickGuess,
      portalGunBox,
      this.numBoxes
    );
    let protocol2Complete = null;

    // Step 4: Second protocol if needed
    if (decision.needsSecondProtocol) {
      const protocol2Session = FairProtocol.initializeProtocol(
        decision.secondRange
      );
      this.display.displayProtocolStart(
        decision.secondRange,
        protocol2Session.hmacDigest,
        2
      );

      const rickValue2 = this.ui.getValidatedInput(
        "Rick: ",
        0,
        decision.secondRange
      );
      protocol2Complete = FairProtocol.completeProtocol(
        protocol2Session,
        rickValue2
      );
      const fairChoice = protocol2Complete.finalResult;

      decision.finalBoxes = this.morty.applySecondProtocol(
        decision,
        fairChoice
      );
    }

    // Step 5: Rick's final choice
    const otherBox = decision.finalBoxes.find((box) => box !== rickGuess);
    this.display.displayFinalChoiceOptions(rickGuess, otherBox);

    const finalChoice = this.ui.getValidatedFinalChoice(
      "Rick: ",
      rickGuess,
      otherBox
    );
    const rickSwitched = finalChoice !== rickGuess;
    const rickWon = finalChoice === portalGunBox;

    // Step 6: Reveal results
    this.display.displayProtocolResults(
      protocol1Complete,
      protocol2Complete,
      this.numBoxes,
      decision.secondRange,
      portalGunBox
    );
    this.display.displayGameResult(rickWon);

    // Step 7: Record statistics
    this.stats.recordRound(rickWon, rickSwitched);
  }
}
