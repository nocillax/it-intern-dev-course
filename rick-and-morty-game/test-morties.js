#!/usr/bin/env node

import ClassicMorty from "./src/morties/ClassicMorty.js";
import LazyMorty from "./src/morties/LazyMorty.js";

/**
 * Comprehensive test suite for both Morty implementations
 * Tests various scenarios: Rick correct/wrong, different box counts, etc.
 */

console.log("🧪 COMPREHENSIVE MORTY TESTS");
console.log("=".repeat(50));

// Test scenarios
const testCases = [
  // 3 boxes scenarios
  {
    numBoxes: 3,
    rickGuess: 0,
    gunBox: 0,
    description: "3 boxes: Rick CORRECT at box 0",
  },
  {
    numBoxes: 3,
    rickGuess: 1,
    gunBox: 1,
    description: "3 boxes: Rick CORRECT at box 1",
  },
  {
    numBoxes: 3,
    rickGuess: 2,
    gunBox: 2,
    description: "3 boxes: Rick CORRECT at box 2",
  },
  {
    numBoxes: 3,
    rickGuess: 0,
    gunBox: 1,
    description: "3 boxes: Rick WRONG (guessed 0, gun at 1)",
  },
  {
    numBoxes: 3,
    rickGuess: 1,
    gunBox: 2,
    description: "3 boxes: Rick WRONG (guessed 1, gun at 2)",
  },

  // 5 boxes scenarios
  {
    numBoxes: 5,
    rickGuess: 0,
    gunBox: 0,
    description: "5 boxes: Rick CORRECT at box 0",
  },
  {
    numBoxes: 5,
    rickGuess: 4,
    gunBox: 4,
    description: "5 boxes: Rick CORRECT at box 4 (highest)",
  },
  {
    numBoxes: 5,
    rickGuess: 2,
    gunBox: 4,
    description: "5 boxes: Rick WRONG (guessed 2, gun at 4)",
  },
];

function testMorty(morty, testCase) {
  const { numBoxes, rickGuess, gunBox, description } = testCase;

  console.log(`\n📋 ${description}`);
  console.log(`   Morty: ${morty.getName()}`);

  try {
    // Step 1: Morty decides
    const decision = morty.decideBoxToKeep(rickGuess, gunBox, numBoxes);
    console.log(
      `   Decision: needsSecondProtocol=${decision.needsSecondProtocol}, secondRange=${decision.secondRange}`
    );

    // Step 2: Apply second protocol (simulate fair choice = 0 for consistency)
    const fairChoice = 0; // Simulated protocol result
    const finalBoxes = morty.applySecondProtocol(decision, fairChoice);

    console.log(`   Final boxes: [${finalBoxes.join(", ")}]`);

    // Validate results
    const validations = [];

    // Check: Rick's box must be included
    if (finalBoxes.includes(rickGuess)) {
      validations.push("✅ Rick's box included");
    } else {
      validations.push("❌ Rick's box missing!");
    }

    // Check: Gun box must be included (never removed)
    if (finalBoxes.includes(gunBox)) {
      validations.push("✅ Gun box preserved");
    } else {
      validations.push("❌ Gun box removed!");
    }

    // Check: Exactly 2 boxes
    if (finalBoxes.length === 2) {
      validations.push("✅ Exactly 2 boxes");
    } else {
      validations.push(`❌ Wrong box count: ${finalBoxes.length}`);
    }

    // Check: All boxes valid indices
    const allValid = finalBoxes.every((box) => box >= 0 && box < numBoxes);
    if (allValid) {
      validations.push("✅ Valid box indices");
    } else {
      validations.push("❌ Invalid box indices!");
    }

    // Specific validation for LazyMorty when Rick is correct
    if (morty.getName() === "LazyMorty" && rickGuess === gunBox) {
      const otherBox = finalBoxes.find((box) => box !== rickGuess);
      const expectedHighest =
        rickGuess === numBoxes - 1 ? numBoxes - 2 : numBoxes - 1;

      if (otherBox === expectedHighest) {
        validations.push("✅ LazyMorty picked highest available box");
      } else {
        validations.push(
          `❌ LazyMorty should pick highest (${expectedHighest}) but picked ${otherBox}`
        );
      }
    }

    validations.forEach((v) => console.log(`   ${v}`));

    return validations.every((v) => v.startsWith("✅"));
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return false;
  }
}

function testTheoreticalProbabilities() {
  console.log("\n🎲 THEORETICAL PROBABILITIES TEST");
  console.log("=".repeat(30));

  const morties = [new ClassicMorty(), new LazyMorty()];
  const boxCounts = [3, 5, 10];

  let allCorrect = true;

  for (const morty of morties) {
    console.log(`\n📊 ${morty.getName()}:`);

    for (const N of boxCounts) {
      const probs = morty.getTheoreticalWinProbability(N);
      const expectedStay = 1 / N;
      const expectedSwitch = (N - 1) / N;

      const stayCorrect = Math.abs(probs.stay - expectedStay) < 0.001;
      const switchCorrect = Math.abs(probs.switch - expectedSwitch) < 0.001;

      console.log(
        `   ${N} boxes: stay=${probs.stay.toFixed(3)} (${
          stayCorrect ? "✅" : "❌"
        }), switch=${probs.switch.toFixed(3)} (${switchCorrect ? "✅" : "❌"})`
      );

      if (!stayCorrect || !switchCorrect) allCorrect = false;
    }
  }

  return allCorrect;
}

// Run all tests
function runAllTests() {
  const morties = [new ClassicMorty(), new LazyMorty()];
  let totalTests = 0;
  let passedTests = 0;

  // Test each Morty with each scenario
  for (const morty of morties) {
    console.log(`\n🤖 TESTING ${morty.getName().toUpperCase()}`);
    console.log("-".repeat(30));

    for (const testCase of testCases) {
      totalTests++;
      if (testMorty(morty, testCase)) {
        passedTests++;
      }
    }
  }

  // Test theoretical probabilities
  console.log("\n");
  totalTests++;
  if (testTheoreticalProbabilities()) {
    passedTests++;
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log(`🎯 TEST SUMMARY: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log("🎉 ALL TESTS PASSED! Both Morties work perfectly!");
  } else {
    console.log(`⚠️  ${totalTests - passedTests} tests failed. Please review.`);
  }

  return passedTests === totalTests;
}

// Run the tests
runAllTests();
