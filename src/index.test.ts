import {
  GameState,
  GameEnding,
  testWinLose,
  testChoice,
  getNormalizedInput,
  getRandomWord,
  getHiddenWord,
  updateHiddenWord,
} from "./index";

it("expects getHiddenWord to returns array of _ ", () => {
  expect(getHiddenWord("bob")).toEqual(["_", "_", "_"]);
});

it("expects getRandomWord to return word from words array", () => {
  const words = ["cats", "dogs", "rabbit"];
  expect(words).toContain(getRandomWord(words));
});

it("expects getRandomWord to return a random word each time", () => {
  const words = ["cats", "dogs", "rabbit"];
  const uniq: string[] = [];
  for (let i = 0; i < 10; i++) {
    const word = getRandomWord(words);
    uniq.includes(word) ? null : uniq.push(word);
  }
  expect(uniq.length).toBeGreaterThan(1);
});

it("expects testChoice to return false on incorrect guess", () => {
  const state: GameState = {
    word: "test",
    hiddenWord: ["t", "_", "s", "t"],
    lives: 8,
    currentChoice: "z",
  };
  expect(testChoice(state)).toBe(false);
});

it("expects testChoice to return true on correct guess", () => {
  const state: GameState = {
    word: "test",
    hiddenWord: ["t", "_", "_", "t"],
    lives: 8,
    currentChoice: "e",
  };
  expect(testChoice(state)).toBe(true);
});

it("expects testWin to return win when user guess matches the word", () => {
  const state: GameState = {
    word: "test",
    hiddenWord: ["t", "e", "s", "t"],
    lives: 8,
  };
  expect(testWinLose(state)).toBe(<GameEnding>"win");
});

it("expects testWin to return lose when lives = zero", () => {
  const state: GameState = {
    word: "test",
    hiddenWord: ["t", "_", "s", "t"],
    lives: 0,
  };
  expect(testWinLose(state)).toBe(<GameEnding>"lose");
});

it("expects testWin to return lose when lives below zero", () => {
  const state: GameState = {
    word: "test",
    hiddenWord: ["t", "_", "s", "t"],
    lives: -1,
  };
  expect(testWinLose(state)).toBe(<GameEnding>"lose");
});

it("expects testWin to return ongoing when lives above 0 and guess not correct", () => {
  const state: GameState = {
    word: "test",
    hiddenWord: ["t", "_", "s", "t"],
    lives: 6,
  };
  expect(testWinLose(state)).toBe(<GameEnding>"ongoing");
});

it("expects updateHiddenWord to return hidden word with correct choice displayed", () => {
  const state: GameState = {
    word: "bob",
    hiddenWord: ["_", "_", "_"],
    lives: 8,
    currentChoice: "o",
  };
  expect(updateHiddenWord(state)).toEqual(["_", "o", "_"]);
});

it("expects updateHiddenWord to return hidden to update multipe of same char", () => {
  const state: GameState = {
    word: "zoom",
    hiddenWord: ["_", "_", "_", "_"],
    lives: 8,
    currentChoice: "o",
  };
  expect(updateHiddenWord(state)).toEqual(["_", "o", "o", "_"]);
});
