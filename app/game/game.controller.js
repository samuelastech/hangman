class GameController {
  #textInput;
  #guessInput;

  #gameView;
  #textModel;

  constructor() {
    this.#gameView = new GameView({
      guessElement: document.querySelector('#game'),
      hangmanElement: document.querySelector('#hangman'),
      formElement: document.querySelector('#form'),
    });
    this.#textInput = document.querySelector('#text');
    this.#gameView.updateHangman();
  }

  /**
   * Gets the submitted word and starts the game
   * @param {SubmitEvent} event 
   */
  start(event) {
    event.preventDefault();
    this.#textModel = new Text(this.#textInput.value);
    this.#gameView.unmountTextForm();
    this.#gameView.initialRender(this.#textModel);
    this.#guessInput = document.querySelector('#guess');
  }

  guess(event) {
    event.preventDefault();
    const letter = this.#guessInput.value;
    if(this.#textModel.triedLettersIncludes(letter)) {
      alert('Você já tentou essa letra');
    } else {
      this.#textModel.triedLetter = letter;
      const hasLetter = this.#textModel.hasLetter(letter);
      if(hasLetter) {
        this.#gameView.updateGuessed(this.#textModel);
        const hasWon = this.#textModel.hasWon;
        if (hasWon) {
          alert('Você ganhou o game');
          this.#gameView.textFormRender();
          this.#gameView.unmountGame();
        } else {
          this.#guessInput.value = '';
          this.#guessInput.focus();
          console.log(this.#guessInput.value)
        }
      } else {
        this.#gameView.updateHangman(this.#textModel);
        const hasLost = this.#gameView.hasLost;
        this.#guessInput.value = '';
        this.#guessInput.focus();
        if (hasLost) {
          alert('Você perdeu o game');
          this.#gameView.unmountGame();
          this.#gameView.textFormRender();
        }
      }
    }
  }
}
