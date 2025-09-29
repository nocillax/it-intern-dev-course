import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

// User input/output with validation
export default class UserInterface {
  getValidatedInput(promptText, min, max) {
    while (true) {
      const input = prompt(promptText);
      const num = parseInt(input.trim(), 10);

      if (isNaN(num) || num < min || num >= max) {
        console.log(`Morty: ${this.getValidRangeMessage(min, max)}`);
        continue;
      }

      return num;
    }
  }
  getValidatedYesNo(promptText) {
    while (true) {
      const input = prompt(promptText);
      const response = input.toLowerCase().trim();

      if (response === "y" || response === "yes") return true;
      if (response === "n" || response === "no") return false;

      console.log("Morty: Rick, just say 'y' for yes or 'n' for no!");
    }
  }
  getValidatedFinalChoice(promptText, originalChoice, switchChoice) {
    while (true) {
      const input = prompt(promptText);
      const num = parseInt(input.trim(), 10);

      if (num === originalChoice || num === switchChoice) {
        return num;
      }

      console.log(
        `Morty: You can only choose ${originalChoice} (stay) or ${switchChoice} (switch)!`
      );
    }
  }

  getValidRangeMessage(min, max) {
    const options = Array.from({ length: max - min }, (_, i) => min + i);
    return options.length === 1
      ? `You can only enter ${options[0]}.`
      : options.length === 2
      ? `You can only enter ${options[0]} or ${options[1]}.`
      : `Please enter a number between ${min} and ${max - 1}.`;
  }

  displayMessage(message) {
    console.log(message);
  }
}
