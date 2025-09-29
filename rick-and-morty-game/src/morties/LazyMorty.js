// LazyMorty: Ignores fair protocol, picks highest available box
export default class LazyMorty {
  getName() {
    return "LazyMorty";
  }

  decideBoxToKeep(rickGuess, portalGunBox, numBoxes) {
    return {
      needsSecondProtocol: true,
      secondRange: numBoxes - 1,
      numBoxes,
      rickGuess,
      portalGunBox,
      finalBoxes: null,
    };
  }
  // Ignores fair protocol, always picks highest available box
  applySecondProtocol(decision, fairChoice) {
    const { rickGuess, portalGunBox, numBoxes } = decision;

    if (rickGuess !== portalGunBox) {
      // Rick wrong: keep Rick's box + gun box
      return [rickGuess, portalGunBox];
    }

    // Rick correct: pick highest box that isn't Rick's
    const highestBox = rickGuess === numBoxes - 1 ? numBoxes - 2 : numBoxes - 1;
    return [rickGuess, highestBox];
  }

  // Same probabilities as classic Monty Hall
  getTheoreticalWinProbability(N) {
    return {
      stay: 1 / N,
      switch: (N - 1) / N,
    };
  }
}
