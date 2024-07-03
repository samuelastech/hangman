class GameView {
  #hangmanPic = 0;
  #hangmanElement;
  #hangman = hangmanPics;
  #guessElement;
  #formElement;
  #lettersDiv;

  constructor({ formElement, guessElement, hangmanElement }) {
    this.#guessElement = guessElement;
    this.#hangmanElement = hangmanElement;
    this.#formElement = formElement;
    this.textFormRender();
  }

  get hasLost() {
    return this.#hangmanPic === this.#hangman.length - 1;
  }

  textFormRender() {
    this.#formElement.innerHTML = this.#templateTextForm();
  }

  initialRender(model) {
    this.#guessElement.innerHTML = this.#templateInitial(model);
    this.#lettersDiv = document.querySelector('#letters');
  }

  updateGuessed(model) {
    this.#lettersDiv.innerHTML = this.#templateUpdateGuessed(model);
  }

  updateHangman() {
    console.log(this.#hangmanPic);
    this.#hangmanElement.innerText = this.#hangman[this.#hangmanPic++];
  }

  #templateUpdateGuessed(model) {
    return `
      <div>
        ${model.guessed.map((letter) => {
          if (letter) {
            return letter === ' ' ? '<br />' : `<span>${letter}</span> `;
          } else {
            return '<span>_</span> ';
          }
        }).join('')}
      </div>
    `;
  }

  #templateInitial(model) {
    return `
      <form onsubmit="controller.guess(event)">
        <div id="letters">
          ${model.text.map((letter) => {
            return letter === ' ' ? '<br />' : '<span>_</span> '
          }).join('')}
        </div>
        <input id="guess" type="text" placeholder="Letra" />
        <button>Advinhar</button>
      </form>
    `;
  }

  #templateTextForm() {
    return `
      <form onsubmit="controller.start(event)">
        <input id="text" type="text" placeholder="Digite uma palavra" required />
        <button>Começar</button>
      </form>
    `;
  }

  /**
   * Unmount and element from the DOM
   * @param {HTMLElement} element 
   */
  #unmount(element) {
    element.innerHTML = '';
  }

  unmountTextForm() {
    this.#unmount(this.#formElement);
  }

  unmountGame() {
    this.#unmount(this.#guessElement);
    this.#hangmanPic = 0;
    this.updateHangman();
  }
}
