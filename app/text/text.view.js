class TextView {
  #textForm;
  #letterForm;
  #gapsElement;

  constructor({ textForm, letterForm }) {
    this.#textForm = textForm;
    this.#letterForm = letterForm;
    this.renderTextForm();
  }

  renderTextForm() {
    this.#textForm.innerHTML = `
      <form onsubmit="controller.start(event)">
        <input id="text" type="text" placeholder="Digite uma palavra" required />
        <button>Começar</button>
      </form>
    `;
  }

  renderLetterForm(model) {
    this.#letterForm.innerHTML = `
      <form onsubmit="controller.guess(event)">
        <div id="gaps">
          ${
            model.text
              .map((letter) => letter === ' ' ? '<br />' : '<span>_</span> ')
              .join('')
          }
        </div>
        <input id="letterInput" type="text" placeholder="Letra" />
        <button>Advinhar</button>
      </form>
    `;

    this.#gapsElement = document.querySelector('#gaps');
  }

  renderGaps(model) {
    this.#gapsElement.innerHTML = model.gaps
      .map((letter) => {
        if (letter) {
          return letter === ' ' ? '<br />' : `<span>${letter}</span> `;
        } else {
          return '<span>_</span> ';
        }
      }).join('');
  }

  #unmount(element) {
    element.innerHTML = '';
  }

  unmountTextForm() {
    this.#unmount(this.#textForm);
  }

  unmountGame() {
    this.#unmount(this.#letterForm);
  }
}