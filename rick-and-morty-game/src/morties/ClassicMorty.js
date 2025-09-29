// ClassicMorty: Uses fair random protocol to select boxes
export default class ClassicMorty {
  getName() {
    return "ClassicMorty";
  }

  decideBoxToKeep(rickGuess, portalGunBox, numBoxes) {
    return {
      needsSecondProtocol: true,
      secondRange: numBoxes - 1,
      rickGuess,
      portalGunBox,
      numBoxes,
      finalBoxes: null,
    };
  }

  // Uses fair protocol result when Rick correct, ignores when Rick wrong
  applySecondProtocol(decision, fairChoice) {
    const { rickGuess, portalGunBox, numBoxes } = decision;

    if (rickGuess !== portalGunBox) {
      // Rick wrong: keep Rick's box + gun box
      return [rickGuess, portalGunBox];
    }

    // Rick correct: simple math instead of array manipulation
    // fairChoice maps to one of (numBoxes - 1) other boxes
    const otherBox = fairChoice % (numBoxes - 1);
    const selectedBox = otherBox >= rickGuess ? otherBox + 1 : otherBox;

    return [rickGuess, selectedBox];
  }
  // Standard Monty Hall probabilities
  getTheoreticalWinProbability(N) {
    return {
      stay: 1 / N,
      switch: (N - 1) / N,
    };
  }
}
