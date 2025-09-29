# Rick and Morty CLI Game 🛸# Rick and Morty Interdimensional Game 🎮

A console-based implementation of a probability game between Rick and Morty featuring provably fair cryptographic protocols, configurable Morty behaviors, and statistical analysis.A cryptographically secure command-line implementation of a probabilistic game between Rick and Morty, based on the Monty Hall problem with cryptographic fair play mechanisms.

## 🎮 Game Description## 🎯 Game Overview

Morty hides Rick's portal gun in one of N boxes using a **provably fair, collaborative, cryptographically secure** random generation protocol. The player (Rick) selects a box, then Morty optionally removes N-2 boxes and offers Rick the choice to switch or stay. The game includes multiple rounds with comprehensive statistics tracking.This game models a scenario where Rick and Morty engage in a probabilistic guessing game involving multiple boxes and a portal gun. The game uses cryptographic protocols to ensure fairness and implements two different Morty strategies.

## ✨ Features### Key Features

- **🔐 Provably Fair Protocol**: HMAC-SHA3 cryptographic verification ensures no cheating- **Cryptographically Secure**: Uses HMAC-SHA256 with 256-bit keys for fair random number generation

- **🎲 Configurable Morty**: Pluggable Morty implementations with different behaviors- **Multiple Strategies**: Supports different Morty implementations (Classic and Lazy)

- **📊 Statistical Analysis**: Real-time probability calculations and experimental statistics - **Real-time Statistics**: Tracks and displays game statistics with theoretical vs experimental probabilities

- **🛡️ Secure Random Generation**: 256-bit cryptographic keys and secure random values- **Extensible Architecture**: Modular design allows for easy addition of new Morty strategies

- **🎯 Multiple Game Modes**: ClassicMorty (random) and LazyMorty (deterministic)- **Interactive CLI**: Full command-line interface with input validation and error handling

- **📈 Beautiful Tables**: ASCII statistics tables with win/loss tracking

## 🚀 Installation

## 🚀 Quick Start

````bash

### Prerequisites# Clone or navigate to the project directory

- Node.js 18+ cd rick-and-morty-game

- npm

# Install dependencies

### Installationnpm install

```bash

git clone <repository-url># Make the executable script runnable (Linux/Mac)

cd rick-and-morty-gamechmod +x bin/randm.js

npm install```

````

## 🎲 How to Play

### Usage

```````bash### Basic Usage

node bin/randm.js <boxes> <morty-implementation>

``````bash

# Play with ClassicMorty using 5 boxes

**Examples:**node bin/randm.js 5 ./src/morties/ClassicMorty.js

```bash

# Play with 3 boxes using ClassicMorty# Play with LazyMorty using 10 boxes

node bin/randm.js 3 ./src/morties/ClassicMorty.jsnode bin/randm.js 10 ./src/morties/LazyMorty.js



# Play with 5 boxes using LazyMorty  # Show help

node bin/randm.js 5 ./src/morties/LazyMorty.jsnode bin/randm.js --help

```````

# Show version

### Argumentsnode bin/randm.js --version

- `<boxes>`: Number of boxes (integer > 2)```

- `<morty-implementation>`: Path to Morty implementation file

### Game Flow

## 🎭 Morty Implementations

1. **Portal Gun Placement**: Uses first fair random number protocol

### ClassicMorty

- **Behavior**: Uses fair random protocol for all decisions - Morty generates secret value and HMAC commitment

- **Strategy**: Never removes the box with the portal gun - Rick provides input value

- **Random Generation**: Always generates fair random values - Portal gun location = (Morty's secret + Rick's input) % N

- **Use Case**: Traditional Monty Hall probability scenario

2. **Rick's Guess**: Rick guesses which box contains the portal gun

### LazyMorty

- **Behavior**: Removes boxes with lowest possible indices (keeps highest index)3. **Morty's Decision**: Morty removes boxes based on strategy

- **Strategy**: Never removes the box with the portal gun

- **Random Generation**: Ignores random values, uses deterministic logic - **ClassicMorty**: Uses second fair protocol when Rick guesses correctly

- **Use Case**: Predictable box selection patterns - **LazyMorty**: Makes deterministic choices (highest-indexed empty box)

## 🔒 Cryptographic Protocol4. **Final Choice**: Rick chooses to STAY or SWITCH

The game implements a **provably fair protocol** ensuring transparency:5. **Results**: Game reveals portal gun location and determines winner

1. **Key Generation**: 256-bit cryptographically secure random key## 🏗️ Architecture

2. **Value Generation**: Morty's value using `crypto.randomInt()`

3. **HMAC Creation**: HMAC-SHA3-256 of Morty's value ### Project Structure

4. **User Input**: Rick provides input for collaborative randomness

5. **Result Calculation**: `(morty_value + rick_value) % N````

6. **Verification**: Original key and value revealed for verificationrick-and-morty-game/

├── bin/

## 📊 Sample Game Output│ └── randm.js # Main executable entry point

├── src/

````│ ├── core/

✅ Game engine ready!│   │   ├── ArgumentParser.js      # Command-line argument validation

│   │   ├── GameEngine.js          # Main game loop and logic

Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the 3 boxes, okay?│   │   ├── MortyInterface.js      # Abstract base class for Morty strategies

Morty: HMAC1=C8E79615E637E6B14DDACA2309069A76D0882A4DD8102D9DEAD3FD6AC4AE289A│   │   ├── RandomGenerator.js     # Cryptographic random number generation

Morty: Rick, enter your number [0,3) so you don't whine later that I cheated, alright?│   │   └── StatisticsCollector.js # Game statistics and reporting

Rick: 2│   ├── lib/

Morty: Okay, okay, I hid the gun. What's your guess [0,3)?│   │   └── asciiTable.js          # Table formatting utilities

Rick: 1│   └── morties/

Morty: Let's, uh, generate another value now, I mean, to select a box to keep in the game.│       ├── ClassicMorty.js        # Traditional Monty Hall strategy

Morty: HMAC2=265AF2F829CB22BD213B525E4409476703B03255E648B61454DB3F9CF696395A│       └── LazyMorty.js           # Deterministic strategy

Morty: Rick, enter your number [0,2), and, uh, don't say I didn't play fair, okay?├── package.json              # Project configuration and dependencies

Rick: 0├── test-components.js        # Component testing script

Morty: I'm keeping the box you chose, I mean 1, and the box 0.└── demo.js                   # Game demonstration script

Morty: You can switch your box (enter 0), or, you know, stick with it (enter 1).```

Rick: 1

Morty: Aww man, my 1st random value is 1.### Core Components

Morty: KEY1=BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2

Morty: So the 1st fair number is (2 + 1) % 3 = 0.#### RandomGenerator

Morty: Aww man, my 2nd random value is 0.

Morty: KEY2=0125EC72E1BE61C71C6D3CF2B5F9DC03C713963E7A026273ECCFE77958A44B1D- Generates 256-bit cryptographically secure keys

Morty: Uh, okay, the 2nd fair number is (0 + 0) % 2 = 0- Creates HMAC-SHA256 commitments

Morty: You portal gun is in the box 0.- Implements fair random number calculation: `(morty + rick) % N`

Morty: Aww man, you lost, Rick. Now we gotta go on one of _my_ adventures!- Provides HMAC verification for game integrity

Morty: D-do you wanna play another round (y/n)?

Rick: n#### GameEngine

Morty: Okay… uh, bye!

- Manages complete game flow and user interactions

                  GAME STATS- Handles first and second fair random number protocols

- Integrates with Morty implementations for decision logic

┌──────────────┬───────────────┬─────────────┐- Collects and displays game statistics

│ Game results │ Rick switched │ Rick stayed │

├──────────────┼───────────────┼─────────────┤#### MortyInterface

│ Rounds       │ 0             │ 1           │

├──────────────┼───────────────┼─────────────┤- Abstract base class defining required methods for all Morty strategies

│ Wins         │ 0             │ 0           │- Enforces consistent API: `decideBoxToKeep()`, `getTheoreticalWinProbability()`, `getName()`

├──────────────┼───────────────┼─────────────┤- Enables easy extension with new strategies

│ P (estimate) │ ?             │ 0.000       │

├──────────────┼───────────────┼─────────────┤## 🧬 Morty Strategies

│ P (exact)    │ 0.667         │ 0.333       │

└──────────────┴───────────────┴─────────────┘### ClassicMorty

````

- **When Rick is wrong**: Always keeps Rick's box and portal gun box

## 🏗️ Architecture- **When Rick is correct**: Uses second fair random number protocol to choose which empty box to keep

- **Probability**: P(stay) = 1/N, P(switch) = (N-1)/N

The codebase follows **Single Responsibility Principle** with 10 well-structured classes:

### LazyMorty

### Core Components

- **`ArgumentParser`**: Command-line argument processing and validation- **When Rick is wrong**: Always keeps Rick's box and portal gun box

- **`FairProtocol`**: Cryptographic HMAC-SHA3 protocol implementation - **When Rick is correct**: Deterministically keeps the empty box with highest index

- **`KeyManager`**: 256-bit secure key generation and formatting- **Probability**: Same as ClassicMorty despite different decision process

- **`GameEngine`**: Game orchestration and flow control

- **`UserInterface`**: Input validation and user interaction## 🔐 Cryptographic Protocol

- **`ResultsDisplay`**: Game output and message formatting

- **`StatisticsCollector`**: Win/loss tracking and table generation### Fair Random Number Generation

- **`MortyLoader`**: Dynamic Morty implementation loading

The game uses a cryptographic commitment scheme to ensure fairness:

### Morty Implementations

- **`ClassicMorty`**: Fair random box selection1. **Commitment Phase**:

- **`LazyMorty`**: Deterministic lowest-index removal

  - Morty generates random value `m`

## 🔧 Technical Details - Morty creates HMAC: `HMAC-SHA256(key, m)`

- Morty reveals HMAC to Rick

### Dependencies

- **`commander`**: Command-line argument parsing2. **Input Phase**:

- **`prompt-sync`**: Synchronous user input handling

- **`cli-table3`**: ASCII table rendering - Rick provides input value `r`

- **`crypto`**: Cryptographic operations (Node.js built-in)

3. **Revelation Phase**:

### Security Features - Morty reveals secret value `m` and key

- **HMAC-SHA3-256**: Cryptographic message authentication - Game verifies HMAC matches

- **256-bit Keys**: Secure random key generation using `crypto.randomBytes()` - Fair number calculated: `(m + r) % N`

- **Secure Random**: `crypto.randomInt()` for cryptographically secure values

- **Protocol Verification**: Keys revealed after input for transparency### Security Properties

### Error Handling- **Unpredictability**: Neither player can predict the outcome alone

- ✅ Clear, user-friendly error messages- **Verifiability**: All computations can be verified using revealed values

- ✅ No stack traces exposed to users- **Non-repudiation**: HMAC prevents tampering with committed values

- ✅ Comprehensive input validation- **Fairness**: Both players contribute equally to randomness

- ✅ File existence verification

## 📊 Statistics and Analysis

## 🧪 Testing

The game tracks comprehensive statistics:

### Available Morty Implementations

````bash- **Win/Loss counts** by strategy (stay vs switch)

# Test all implementations- **Experimental probabilities** vs theoretical expectations

node test-morties.js- **Round-by-round history** with decision details

```- **Confidence levels** based on sample size



### Error Testing Examples### Example Output

```bash

# Missing arguments```

node bin/randm.js┌──────────┬──────┬────────┬───────┬──────────┬────────────┬──────────────┐

│ Strategy │ Wins │ Losses │ Total │ Win Rate │ Theoretical │ Difference   │

# Invalid box count  ├──────────┼──────┼────────┼───────┼──────────┼────────────┼──────────────┤

node bin/randm.js 2 ./src/morties/ClassicMorty.js│ Stay     │ 12   │ 48     │ 60    │ 20.00%   │ 20.00%     │ +0.00%       │

│ Switch   │ 32   │ 8      │ 40    │ 80.00%   │ 80.00%     │ +0.00%       │

# Non-existent file│ Overall  │ 44   │ 56     │ 100   │ 44.00%   │ Variable   │ N/A          │

node bin/randm.js 3 ./nonexistent.js└──────────┴──────┴────────┴───────┴──────────┴────────────┴──────────────┘

````

## 📁 Project Structure## 🧪 Testing

````### Component Tests

rick-and-morty-game/

├── bin/```bash

│   └── randm.js                 # Main executable entry point# Run comprehensive component tests

├── src/node test-components.js

│   ├── core/                    # Core game logic```

│   │   ├── ArgumentParser.js    # CLI argument processing

│   │   ├── FairProtocol.js      # Cryptographic protocolTests include:

│   │   ├── KeyManager.js        # Secure key management

│   │   ├── GameEngine.js        # Game orchestration- RandomGenerator cryptographic functions

│   │   ├── UserInterface.js     # User input handling- Morty strategy implementations

│   │   ├── ResultsDisplay.js    # Output formatting- Statistics collection and reporting

│   │   ├── StatisticsCollector.js # Statistics tracking- Security properties validation

│   │   └── MortyLoader.js       # Plugin loading

│   └── morties/                 # Morty implementations### Demo Mode

│       ├── ClassicMorty.js      # Random selection strategy

│       └── LazyMorty.js         # Deterministic strategy```bash

├── package.json                 # Dependencies and scripts# Run interactive demo

├── package-lock.json           # Dependency lock filenode demo.js

├── README.md                   # This file```

└── test-morties.js             # Implementation testing

```Shows simulated game rounds with both Morty strategies.



## 🎯 Probability Mathematics## 🛠️ Development



### Monty Hall Problem Theory### Adding New Morty Strategies

For N boxes with 1 portal gun:

- **Stay Probability**: `1/N` (original choice remains)1. Create new class extending `MortyInterface`

- **Switch Probability**: `(N-1)/N` (all other boxes combined)2. Implement required methods:



### Example with 3 Boxes   - `getName()`: Return strategy name

- **Stay**: 33.3% chance (1/3)     - `decideBoxToKeep(rickChoice, portalGunBox, allBoxes)`: Main decision logic

- **Switch**: 66.7% chance (2/3)   - `getTheoreticalWinProbability(N)`: Calculate theoretical probabilities



The game tracks both experimental results and theoretical probabilities for comparison.3. Export as default from new file in `src/morties/`



## 🤝 ContributingExample:



### Adding New Morty Implementations```javascript

import MortyInterface from '../core/MortyInterface.js';

1. Create new file in `src/morties/`

2. Implement required methods:export default class CustomMorty extends MortyInterface {

   ```javascript    getName() {

   export default class CustomMorty {        return 'CustomMorty';

     getName() { /* return name */ }    }

     decideBoxToKeep(rickGuess, portalGunBox, numBoxes) { /* decision logic */ }

     applySecondProtocol(decision, fairChoice) { /* box selection */ }    decideBoxToKeep(rickChoice, portalGunBox, allBoxes) {

     getTheoreticalWinProbability(N) { /* probability calculation */ }        // Custom logic here

   }        return {

   ```            boxesToKeep: [...],

3. Test with: `node bin/randm.js 3 ./src/morties/CustomMorty.js`            reasoning: '...',

            usedSecondProtocol: false

## 📋 Requirements Compliance        };

    }

✅ **All Task Requirements Met:**

- Console script with command-line arguments    getTheoreticalWinProbability(N) {

- Provably fair cryptographic protocol          return {

- HMAC-SHA3 implementation            stay: 1/N,

- 256-bit secure keys            switch: (N-1)/N

- Multiple Morty implementations        };

- Statistics with ASCII tables (cli-table3)    }

- 10 well-structured classes}

- Standard crypto APIs (no custom implementations)```

- English code and output

- User-friendly error handling### Configuration



## 📄 LicenseKey configuration in `package.json`:



This project is part of an educational assignment and follows academic use guidelines.- `"type": "module"` enables ES6 modules

- Dependencies: `yargs`, `cli-table3`, `prompt-sync`

## 🙏 Acknowledgments- Scripts for testing and running



- **Task Design**: iTaransition Internship Program## 🎓 Educational Value

- **Cryptography**: Node.js crypto module

- **UI Components**: cli-table3, prompt-sync, commanderThis implementation demonstrates:

- **Inspiration**: Classic Monty Hall probability problem
### Computer Science Concepts

- **Cryptographic Protocols**: HMAC, commitment schemes, key generation
- **Object-Oriented Design**: Inheritance, interfaces, modularity
- **Probability Theory**: Monty Hall problem, experimental vs theoretical
- **Software Architecture**: MVC pattern, dependency injection

### Mathematics

- **Conditional Probability**: P(win|stay) vs P(win|switch)
- **Statistical Analysis**: Convergence to theoretical probabilities
- **Cryptographic Hash Functions**: SHA-256, collision resistance

### Security

- **Fair Play Mechanisms**: Preventing cheating in digital games
- **Commitment Schemes**: Cryptographic binding and hiding
- **Randomness Generation**: Cryptographically secure randomness

## 🐛 Troubleshooting

### Common Issues

1. **Module Not Found**: Ensure you're running from project root directory
2. **Invalid Arguments**: Check minimum boxes (3) and valid file paths
3. **HMAC Verification Failed**: Indicates tampering - restart game
4. **Permission Denied**: Make script executable with `chmod +x bin/randm.js`

### Error Codes

- **Exit 0**: Normal completion
- **Exit 1**: Error (invalid arguments, file not found, etc.)
- **SIGINT**: User interrupted (Ctrl+C)

## 📝 License

This project is part of an educational course on IT internship development.

## 🤝 Contributing

This is an educational project demonstrating:

- Modern JavaScript (ES6+) best practices
- Cryptographic protocol implementation
- Interactive CLI application development
- Object-oriented design patterns
- Statistical analysis and visualization

---

_"Wubba lubba dub dub! Science doesn't care about your feelings, Rick!"_ - Morty Smith
````
