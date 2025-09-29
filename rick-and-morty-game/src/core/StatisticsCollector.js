import Table from "cli-table3";

/**
 * Statistics collector matching the exact task format
 */
export default class StatisticsCollector {
  constructor() {
    this.switchedRounds = 0;
    this.stayedRounds = 0;
    this.switchedWins = 0;
    this.stayedWins = 0;
  }

  /**
   * Record a game round result
   */
  recordRound(rickWon, rickSwitched) {
    if (rickSwitched) {
      this.switchedRounds++;
      if (rickWon) this.switchedWins++;
    } else {
      this.stayedRounds++;
      if (rickWon) this.stayedWins++;
    }
  }

  /**
   * Generate the exact table format from task example
   * @param {Object} morty - Morty implementation for theoretical probabilities
   * @param {number} numBoxes - Number of boxes in the game
   */
  generateTable(morty, numBoxes) {
    const table = new Table({
      head: ["Game results", "Rick switched", "Rick stayed"],
      style: { head: [] }, // Remove colors for simple output
    });

    table.push(["Rounds", this.switchedRounds, this.stayedRounds]);
    table.push(["Wins", this.switchedWins, this.stayedWins]);

    // Calculate experimental probabilities
    const switchRate =
      this.switchedRounds > 0
        ? (this.switchedWins / this.switchedRounds).toFixed(3)
        : "?";
    const stayRate =
      this.stayedRounds > 0
        ? (this.stayedWins / this.stayedRounds).toFixed(3)
        : "?";

    table.push(["P (estimate)", switchRate, stayRate]);

    // Get theoretical probabilities from Morty implementation
    const probabilities = morty.getTheoreticalWinProbability(numBoxes);
    const exactSwitch = probabilities.switch.toFixed(3);
    const exactStay = probabilities.stay.toFixed(3);

    table.push(["P (exact)", exactSwitch, exactStay]);

    return table.toString();
  }
}
