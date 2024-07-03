class GameController {
  #textInput;
  #letterInput;

  #hangmanView;
  #textView;
  #textModel;

  constructor() {
    this.#loadViews();
    this.#textInput = document.querySelector('#text');
  }

  #loadViews() {
    this.#hangmanView = new HangmanView({
      hangmanDiv: document.querySelector('#hangman'),
    });
    this.#textView = new TextView({
      letterForm: document.querySelector('#letterForm'),
      textForm: document.querySelector('#textForm'),
    });
  }

  /**
   * Gets the submitted word and starts the game
   * @param {SubmitEvent} event 
   */
  start(event) {
    event.preventDefault();
    this.#textModel = new Text(this.#textInput.value);
    this.#textView.unmountTextForm();
    this.#textView.renderLetterForm(this.#textModel);
    this.#letterInput = document.querySelector('#letterInput');
  }

  guess(event) {
    event.preventDefault();
    const letter = this.#letterInput.value;
    if(this.#textModel.triedLettersIncludes(letter)) {
      alert('Você já tentou essa letra');
    } else {
      this.#textModel.triedLetter = letter;
      const hasLetter = this.#textModel.hasLetter(letter);
      if(hasLetter) {
        this.#textView.renderGaps(this.#textModel);
        const hasWon = this.#textModel.hasWon;
        if (hasWon) {
          alert('Você ganhou o game');
          this.#textView.renderTextForm();
          this.#textView.unmountGame();
        } else {
          this.#letterInput.value = '';
          this.#letterInput.focus();
        }
      } else {
        this.#hangmanView.nextFrame();
        const hasLost = this.#hangmanView.isLastFrame;
        this.#letterInput.value = '';
        this.#letterInput.focus();
        if (hasLost) {
          alert('Você perdeu o game');
          this.#hangmanView.reset();
          this.#textView.unmountGame();
          this.#textView.renderTextForm();
        }
      }
    }
  }
}
