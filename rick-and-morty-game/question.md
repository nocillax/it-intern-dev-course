# TASK #4 - Rick and Morty CLI Game

**Original Task Document for Future Reference**

---

## Task Overview

For those who have already completed tasks #1, #2 and #3.

Using any language of your choice from the following set—C#, JavaScript, TypeScript, Java, PHP, Ruby, Python, or Rust—and write a console script that models a game between Rick and Morty with an arbitrary number of boxes.

You are encouraged to use the language of your specialization (e.g., C# or JavaScript/TypeScript), but this is not mandatory.

## Command-Line Arguments

The script must be executable from the command line, receiving its configuration as command-line arguments only. Specifically, it should accept:

- The number of boxes (an integer greater than 2).
- A path to a "Morty implementation." This may vary by language—for example, it might be just a file path or both a file path and a class name.

**Example usage in Ruby:**

```bash
ruby randm.rb 3 ./evil_morty.rb EvilMorty
```

**Error Handling Requirements:**

- If the arguments are incorrect, the script must output a clear, user-friendly error message explaining what went wrong (e.g., only one argument provided, invalid box count, missing class name, etc.) and how to fix it, ideally with an example.
- Do not display a stack trace—the message should guide the user in plain English.
- All code and output must be written in English, using English names and identifiers only.
- The game configuration must be supplied via command-line arguments—you should not read or parse it from standard input.

## Game Features

The game has three killer features:

1. **Configurable Morty**
2. **Provably fair, collaborative, cryptographically secure random generation** for the box selection
3. **Automatic probability calculation** as well as experiment-based probability estimation

## Game Description

Morty hides Rick's portal gun in one of N boxes (the box is selected using provably fair, collaborative, cryptographically secure random generation). The user plays as Rick and selects one of the boxes.

Then, Morty (controlled by the computer) optionally removes N - 2 of the remaining boxes that do not contain the portal gun, and gives Rick the choice: either keep the originally selected box or switch to another unopened one.

Whether Morty does that at all, in which cases he does it, and what random generator he uses all depend on the Morty implementation.

Finally, the chosen box is opened.

If it contains the portal gun, Rick wins. Otherwise, Morty wins.

The game repeats for multiple rounds—each starting with hiding the portal gun—until the user chooses the [Exit] option. At that point, the game prints a summary of the experimental statistics (i.e., how many games Rick won/lost) as well as the theoretical probabilities for reference.

## Architecture Requirements

The idea is to implement "pluggable Morties". You'll structure the project into multiple components:

### A "Game Core", which includes:

- Argument processing
- All game logic
- The interaction flow
- The provably fair, collaborative, cryptographically secure random generation "protocol"
- Statistics collection
- A base definition of Morty (e.g., an interface or abstract class, depending on the language)

### One or more Morty implementations

Each with different behaviors (e.g., random, evil, benevolent, etc.).

**Important Notes:**

- Every time Morties need to generate a random value, they must use the provably fair, collaborative, cryptographically secure random generator provided by the "Game Core".
- The probability calculation is delegated to the Morty implementation, as it depends on Morty's behavior.

## Implementation Requirements

Please note, the task is not simply "to implement some game." You are expected to implement all specified requirements, including:

- Provably fair, collaborative, cryptographically secure random generation
- Selectable number of boxes
- Multiple game rounds
- Probability calculation
- Proper class design with clear separation of responsibilities

## Cryptographic Protocol

**Provably Fair, Collaborative, Cryptographically Secure Random Value Generation Protocol**

To generate an integer value (e.g., to select one of N boxes), the game performs the following steps:

1. Generate a one-time, cryptographically secure random key using appropriate APIs such as SecureRandom, RandomNumberGenerator, random_bytes, etc. The key must be at least 256 bits long.
2. Generate Morty's value as a uniformly distributed cryptographically secure random integer in the required range from 0 to N - 1 (this value is kept secret initially).
3. Compute an HMAC of Morty's value, using the generated secret key.
4. Display the resulting HMAC to Rick (the user).
5. Ask the user to provides a Rick's value (an integer value in the same range from 0 to N - 1).
6. Compute the final result using modular arithmetic to calculate (morty_value + rick_value) % N.
7. Return that value to Morty implementation, which can use it.
8. By a separate request from Motry, display the Morty's original value, the final result, and the secret key used.

**Critical Protocol Requirements:**

- The described sequence is critical. Do not reveal the key before the user provides their input for Rick's value, or re-display the HMAC second time instead of the key—it defeats the whole purpose of verifiability.
- Generation must involve both parties, Morty (the computer) generates a value and HMAC and Rick (the user) provides an input.
- Simply generating a random value is not enough for box selection.

This protocol ensures that the computer cannot cheat without being caught.

**Important Technical Notes:**

- Do not try to substitute random key with a GUID, hash of a some random string, or any other workaround.
- Use HMAC based on SHA-3.

## Class Structure Requirements

Note that all the components mentioned above should be placed in separate classes in separate files:

- Random key management should be in its own class.
- Statistics accumulation should be in its own class.
- The implementation of the provably fair number generation protocol should be in its own class.
- Command-line argument parsing and validation should be in its own class.
- "Morty plugin" loading should be in its own class.
- Each Morty implementation should be in a separate project, and of course, in its own class as well.
- And so on, and so forth.

**In general, your code should consist of at least 7–10 well-structured classes.**

Conversely, don't overuse modules, namespaces, packages, or whatever your language uses for "logical grouping". This is a small task, and there's usually no need to place every single class into its own folder or namespace. You may want to isolate parts of the interaction between the game and Morty into a separate module or package, but only if there's a clear justification. Avoid overusing too thin "groups"—it's usualy poor approach for a module, namespace, package, or whatever to contain only 1 or 2 types. But classes are never too thin.

You should make full use of core libraries and third-party libraries where appropriate. Do not reinvent the wheel for tasks that are already well-supported by the language ecosystem.

## Example Output

**Example (Java used as example, but you should use your group's language):**

```
> java -jar randm.jar 3 com.itransition.randm.morties.ClassicMorty
> Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the 3 boxes, okay?
> Morty: HMAC1=C8E79615E637E6B14DDACA2309069A76D0882A4DD8102D9DEAD3FD6AC4AE289A
> Morty: Rick, enter your number [0,3) so you don't whine later that I cheated, alright?
> Rick: 2
> Morty: Okay, okay, I hid the gun. What's your guess [0,3)?
> Rick: 1
> Morty: Let's, uh, generate another value now, I mean, to select a box to keep in the game.
> Morty: HMAC2=265AF2F829CB22BD213B525E4409476703B03255E648B61454DB3F9CF696395A
> Morty: Rick, enter your number [0,2), and, uh, don't say I didn't play fair, okay?
> Rick: 0
> Morty: I'm keeping the box you chose, I mean 1, and the box 0.
> Morty: You can switch your box (enter 0), or, you know, stick with it (enter 1).
> Rick: 1
> Morty: Aww man, my 1st random value is 1.
> Morty: KEY1=BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2
> Morty: So the 1st fair number is (2 + 1) % 3 = 0.
> Morty: Aww man, my 2nd random value is 0.
> Morty: KEY2=0125EC72E1BE61C71C6D3CF2B5F9DC03C713963E7A026273ECCFE77958A44B1D
> Morty: Uh, okay, the 2nd fair number is (0 + 0) % 2 = 0
> Morty: You portal gun is in the box 0.
> Morty: Aww man, you lost, Rick. Now we gotta go on one of _my_ adventures!
> Morty: D-do you wanna play another round (y/n)?
> Rick: No
> Morty: Okay… uh, bye!

                  GAME STATS

┌──────────────┬───────────────┬─────────────┐
│ Game results │ Rick switched │ Rick stayed │
├──────────────┼───────────────┼─────────────┤
│ Rounds │ 0 │ 1 │
├──────────────┼───────────────┼─────────────┤
│ Wins │ 0 │ 0 │
├──────────────┼───────────────┼─────────────┤
│ P (estimate) │ ? │ 0.000 │
├──────────────┼───────────────┼─────────────┤
│ P (exact) │ 0.667 │ 0.333 │
└──────────────┴───────────────┴─────────────┘

>
```

**Note:** Most of Morty's lines are actually printed by the game itself, not by the Morty implementation. However, the implementation can provide some additional remarks to make it funnier and give the impression that it's a different Morty.

Of course, the calculated probability should be implemented as a method in the Morty implementation, because the probability of winning if Rick switches boxes depends on Morty's behavior.

## Required Morty Implementations

You have to implement at least two Morties (or more):

### ClassicMorty

Who always generates a random value to decide which box to leave, alongside the one selected by Rick. ClassicMorty never removes the box with the portal gun from the game. This means that the generated number is used only if Rick's initial guess is correct. If it's not, ClassicMorty still generates a fair random value to conceal this fact, but doesn't use it and keeps the box with the portal gun in the game.

### LazyMorty

Who also never removes the box with the portal gun, but instead removes boxes with the lowest possible indices—without generating any random numbers at all.

## Technical Requirements

### Table Display

Of course, you must use a 3rd-party library to print a nice ASCII-table with the game results.

**⚠️ IMPORTANT:** Please, note that grade in the task 4 will be lower if you use console.table for output — it can be used only for debug, the output doesn't look like expected user-friendly table at all ("index" in the header, quotation marks in the cells, etc.).

### Random Number Generation

**⚠️ CRITICAL:** I won't accepted custom implementations of random number generation from this moment, it's not funny anymore.

Use standard library methods. For example, in C#:

- Do NOT create custom implementations like manual byte manipulation loops
- Use standard APIs like RandomNumberGenerator.Create()

## Submission Requirements

To submit the solution you need to send an e-mail to p.lebedev@itransition.com with the following:

### Video Demonstration

A link to a video demonstrating launch with different parameters, including (in that order):

1. Run with 3 boxes and the ClassicMorty (3 rounds and the result table)
2. Run with 3 boxes and the LazyMorty (3 rounds and the result table)
3. Run with incorrect parameters: no arguments, only one argument equal to 1; non-existent Morty class.

**Video Requirements:**

- Make the video publicly accessible. Don't try to share your video with my work e-mail or something. Make your video public. Don't narrate, no sound.
- Open terminal in full screen during recording. I am sorry, but I won't be able to accept your solution if all the action will take place in the lowest pixels of the video under the video player's seek bar. Use full screen. Videos where game console takes less than 50% of the screen will be rejected.

### GitHub Repository

A link to the Github public repository.

## Educational Purpose

### What is this task for?

You need to learn how to:

- Read and understand the requirements
- Understand hash functions a little bit deeper, understand what they are for
- Know the HMAC concept
- Learn to think about how the exact sequence of steps can give you some kind of proof or contract
- Work with external libraries
- Touch on some basics of OOP
- Implement an open system that can be extended by plugging in new behavior without modifying the orignal code
- And a few other things

## Additional Explanations

### HMAC Details

When calculating HMAC, the key is the same secret key that you generated. And the message is a Morty's number. Each "fair random number" depends on numbers, generated by both Morty (the computer) and Rick (the user). HMAC is used to prove that Morty did't change its number after Rick made the selection.

After getting the key, the user will be able to calculate the HMAC and compare it with the HMAC that was shown before. It's not very difficult.

Of course, there is no sense to print "I check the HMAC, everything is OK". You may provide some link to external service to check HMAC, but this is optional and non-essential.

### Common Mistakes

A common mistake is trying to invent your "HMAC" as a hash of a random "key." This will not work. If you show the same lines before the Rick's selection and after the Rick's selection, the Rick does not receive new information, and, accordingly, Morty does not prove anything to him. It is necessary to generate a key (with a cryptographically secure generator), generate a Morty's value, calculate HMAC (by a standard algorithm) from a Morty's value (message) and a key (key), show HMAC, get a Rick's value, calculate the result and show the key. Re-read this paragraph until the total comprehension.

## DEADLINE

**DEADLINE for this task is the 30.09.2025.**

---

**Task Source:** iTaransition Internship Program  
**Task Author:** p.lebedev@itransition.com  
**Language:** JavaScript/Node.js (ES6+ Modules)  
**Implementation Date:** September 2025
