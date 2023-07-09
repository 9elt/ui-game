import html2canvas from "html2canvas";

import { ARENA_HEIGHT, ARENA_WIDTH, BG_TOL } from "../config";
import { clampInt } from "../util";

export default class Arena {
  /** @type {number} */
  width;
  /** @type {number} */
  height;
  /** @type {number[][]} */
  grid;

  /** @type {number} */
  #lastX;
  /** @type {number} */
  #lastY;

  /** @type {number} */
  #bg;
  /** @type {number} */
  #bgMax;
  /** @type {number} */
  #bgMin;

  constructor() { }

  static async initialize() {
    const arena = new Arena();

    arena.width = ARENA_WIDTH;
    arena.height = ARENA_HEIGHT;

    arena.#lastX = arena.width - 1;
    arena.#lastY = arena.height - 1;

    arena.#bg = parseInt(
      getComputedStyle(document.body)?.background?.split("(")[1]?.split(",")?.[0]
    ) || 255;

    arena.#bgMax = arena.#bg + BG_TOL;
    arena.#bgMin = arena.#bg - BG_TOL;

    const bytes = (await html2canvas(document.documentElement))
      .getContext("2d")
      .getImageData(0, 0, arena.width, arena.height, { colorSpace: "srgb" });

    const grid = [[]];

    for (let i = 0; i < bytes.data.length; i++) {
      if (i % 4 !== 0) { continue; }

      grid[grid.length - 1].length < arena.width
        ? grid[grid.length - 1].push(bytes.data[i])
        : grid.push([bytes.data[i]]);
    }

    grid[grid.length - 1].fill(9999);

    arena.grid = grid;

    return arena;
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @returns {number}
   */
  at(x, y) {
    return this.grid[
      clampInt(y, 0, this.#lastY)
    ][
      clampInt(x, 0, this.#lastX)
    ];
  }

  /**
   * @param {number} byte 
   * @returns {boolean}
   */
  isBg(byte) {
    return byte < this.#bgMax && byte > this.#bgMin
  }
}
