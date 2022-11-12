import prompt from "prompt-sync";
const Prompt = prompt();

export type GameEnding = "win" | "lose" | "ongoing";
export interface GameState {
  word: string;
  hiddenWord: string[];
  lives: number;
  currentChoice?: string;
}

export const getHiddenWord = (word: string) => {
  return word.split("").map((_) => "_");
};

export const getRandomWord = (words: string[]) => {
  const rand = Math.floor(Math.random() * words.length);
  return words[rand];
};

export const getNormalizedInput = (message: string) => {
  const res = Prompt(message).toLowerCase();
  return res.toLowerCase();
};

const outputHeading = () => {
  console.log("\n---------- Hang-Man -----------\n");
};

const displayEndText = (type: GameEnding) => {
  type === "win"
    ? console.log("Congrats You Won")
    : console.log("Better Luck Next Time");
};

export const testWinLose = (state: GameState): GameEnding => {
  return state.word === state.hiddenWord.join("")
    ? "win"
    : state.lives <= 0
    ? "lose"
    : "ongoing";
};

export const updateHiddenWord = (state: GameState) => {
  let newHidden = [...state.hiddenWord];
  state.word
    .split("")
    .forEach((v, i) => (v == state.currentChoice ? (newHidden[i] = v) : null));
  return newHidden;
};

export const testChoice = (state: GameState) => {
  if (!state.currentChoice) {
    return false;
  }
  return state.word.split("").includes(state.currentChoice) &&
    !state.hiddenWord.includes(state.currentChoice)
    ? true
    : false;
};

const game = (state: GameState) => {
  console.clear();
  outputHeading();
  console.log(`\t${state.hiddenWord}\tLives: ${state.lives}\n`);

  const gameState = testWinLose(state);
  if (gameState !== "ongoing") {
    displayEndText(gameState);
    getNormalizedInput("Continue Playing (y/N): ") !== "y"
      ? process.exit(0)
      : newGame();
  }

  state.currentChoice = getNormalizedInput("Pick a letter: ");
  testChoice(state)
    ? (state.hiddenWord = updateHiddenWord(state))
    : state.lives--;
  game(state);
};

const newGame = () => {
  const words = ["cats", "dogs", "frogs"];
  const newWord = getRandomWord(words);
  game({ word: newWord, hiddenWord: getHiddenWord(newWord), lives: 8 });
};

if (require.main === module) {
  newGame();
}
