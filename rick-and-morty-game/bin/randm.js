#!/usr/bin/env node

import ArgumentParser from "../src/core/ArgumentParser.js";
import MortyLoader from "../src/core/MortyLoader.js";
import GameEngine from "../src/core/GameEngine.js";
import StatisticsCollector from "../src/core/StatisticsCollector.js";

async function main() {
  try {
    const { boxes, mortyPath } = await ArgumentParser.parseArguments(
      process.argv
    );
    const mortyInstance = await MortyLoader.loadMorty(mortyPath);

    console.log("✅ Game engine ready!\n");

    const stats = new StatisticsCollector();
    const game = new GameEngine(boxes, mortyInstance, stats);
    await game.startGame();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
