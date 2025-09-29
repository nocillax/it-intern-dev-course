// Simple Morty plugin loader
export default class MortyLoader {
  static async loadMorty(mortyPath) {
    const fileUrl = new URL(`file://${mortyPath}`).href;
    const mortyModule = await import(fileUrl);
    const mortyInstance = new mortyModule.default();

    // Basic validation
    if (
      !mortyInstance.getName ||
      !mortyInstance.decideBoxToKeep ||
      !mortyInstance.getTheoreticalWinProbability
    ) {
      throw new Error("Invalid Morty implementation");
    }

    return mortyInstance;
  }
}
