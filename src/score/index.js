import { SCORE_MODEL } from "../models/score";

export default class Score {
  /** @type {number} */
  #current;

  /** @type {HTMLDivElement} */
  #HTMLelement;
  /** @type {HTMLSpanElement} */
  #HTMLvalue;

  constructor() { }

  static initialize() {
    const score = new Score();

    score.#current = 0;

    score.#HTMLelement = document.createElement("div");
    score.#HTMLelement.className = "uigame-score";
    score.#HTMLelement.innerHTML = SCORE_MODEL;
    document.body.append(score.#HTMLelement);
    score.#HTMLvalue = score.#HTMLelement.querySelector(".current-value");

    return score;
  }

  get current() {
    this.#current;
  }

  /** @param {number} v */
  incr(v) {
    this.#current += v;
    this.#HTMLvalue.textContent = this.#current + "";
  }

  destroy() {
    this.#HTMLelement?.remove();
  }
}
