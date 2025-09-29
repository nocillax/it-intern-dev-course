import { Command } from "commander";
import { promises as fs } from "fs";
import path from "path";

export default class ArgumentParser {
  static async parseArguments(args) {
    const program = new Command();
    program
      .name("randm")
      .description("Rick and Morty CLI Game")
      .version("1.0.0")
      .argument("<boxes>", "Number of boxes", (value) => {
        // Check if the input contains decimal points or non-integer characters
        if (!/^\d+$/.test(value)) {
          throw new Error(
            `Invalid boxes: ${value} (must be a positive integer)`
          );
        }
        const num = parseInt(value, 10);
        if (isNaN(num) || num < 3) throw new Error(`Invalid boxes: ${value}`);
        return num;
      })
      .argument("<morty>", "Path to Morty implementation");

    program.parse(args);

    // Use processedArgs to get transformed values, fallback to manual conversion
    const boxes = program.processedArgs
      ? program.processedArgs[0]
      : parseInt(program.args[0], 10);
    const morty = program.args[1];

    const mortyPath = path.resolve(process.cwd(), morty);
    await fs.access(mortyPath);
    return { boxes, mortyPath };
  }
}
