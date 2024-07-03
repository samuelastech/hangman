class HangmanView {
  #frames = hangmanFrames;
  #currentFrame = 0;
  #hangmanDiv;

  constructor({ hangmanDiv }) {
    this.#hangmanDiv = hangmanDiv;
    this.render();
  }

  render() {
    this.#hangmanDiv.innerText = this.#frames[this.#currentFrame];
  }

  reset() {
    this.#currentFrame = 0;
    this.render();
  }

  nextFrame() {
    this.#currentFrame++;
    this.render();
  }

  get isLastFrame() {
    return this.#currentFrame === this.#frames.length - 1;
  }
}