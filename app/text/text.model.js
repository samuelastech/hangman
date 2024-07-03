class Text {
  /** @type {Array<string>} */
  #text;

  /** @type {Array<string>} */
  #gaps = [];

  /** @type {Array<string>} */
  #triedLetters = [];

  /**
   * @constructor
   * @param {string} text 
   */
  constructor(text) {
    this.#text = text.toUpperCase().split('');
    for(let i = 0; i < this.#text.length; i++) {
      if (this.text[i] === ' ') this.#gaps[i] = ' ';
      else this.#gaps[i] = null;
    }
  }

  get hasWon() {
    return JSON.stringify(this.#gaps) === JSON.stringify(this.#text);
  }

  get hasLost() {
    
  }

  get text() {
    return this.#text;
  }

  get gaps() {
    return this.#gaps;
  }

  set triedLetter(letter) {
    this.#triedLetters.push(letter.toUpperCase());
  }

  triedLettersIncludes(letter) {
    return this.#triedLetters.includes(letter.toUpperCase());
  }

  hasLetter(letter) {
    letter = letter.toUpperCase();
    let fromIndex = 0;
    let lettersCount = 0;
    let checkIsOver = false;
    while(!checkIsOver) {
      let i = this.#text.indexOf(letter, fromIndex);
      fromIndex = i + 1;
      if (i !== -1) {
        this.#gaps[i] = letter;
        lettersCount++;
      } else {
        checkIsOver = true;
      }
    }

    return lettersCount > 0;
  }
}
