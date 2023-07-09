/** 
 * @typedef {import('../arena').default} Arena 
 * @typedef {"still" | "mov-l" | "mov-r" | "jump"} Animation 
 */


import { PLAYER_MODEL } from "../models/player";

import { ACCEL_X, ACCEL_Y, ARENA_MARGIN, COLLISION_TOL, INTERACT_PAD, JUMP_H, MAX_ACCEL_X, MAX_ACCEL_Y, MAX_JUMP_SPEED, MAX_SPEED_X, MAX_SPEED_Y, PLAYER_SIZE } from "../config";
import { clampFloat, clampInt } from "../util";

export default class Player {
  /** @type {Arena} */
  arena;

  /** @type {number} */
  size;

  /** @type {number} */
  jumping;
  /** @type {boolean} */
  doubleJumpEnable;

  /** @type {{ l: boolean, r: boolean }} */
  moving;
  /** @type {{ x: number, y: number }} */
  speed;

  /** @type {Float64Array} */
  #pos;
  /** @type {number} */
  #lastX;
  /** @type {number} */
  #lastY;

  /** @type {HTMLDivElement} */
  #HTMLelement;

  constructor() { }

  /**
   * @param {Arena} arena 
   * @returns 
   */
  static initialize(arena) {
    const player = new Player();

    player.arena = arena;

    player.moving = {
      l: false,
      r: false,
    }

    player.speed = {
      x: 0,
      y: 0,
    }

    player.jumping = 0;
    player.doubleJumpEnable = false;

    player.#HTMLelement = document.createElement("div");
    player.#HTMLelement.className = "uigame-player still";
    player.#HTMLelement.innerHTML = PLAYER_MODEL;
    document.body.append(player.#HTMLelement);

    player.#pos = new Float64Array(2).fill(0);
    player.size = PLAYER_SIZE;

    player.#lastX = Math.floor(player.arena.width - (player.size + ARENA_MARGIN));
    player.#lastY = Math.floor(player.arena.height - (player.size + ARENA_MARGIN));

    player.setX(() => player.arena.width / 1.5);
    player.setY(() => 16);

    player.render();

    return player;
  }

  get x() {
    return this.#pos[0];
  }

  get y() {
    return this.#pos[1];
  }

  /** @param {(prevX: number) => number} f */
  setX(f) {
    this.#pos[0] = clampInt(f(this.#pos[0]), ARENA_MARGIN, this.#lastX);
  }

  /** @param {(prevY: number) => number} f */
  setY(f) {
    this.#pos[1] = clampInt(f(this.#pos[1]), ARENA_MARGIN, this.#lastY);
  }

  render() {
    this.#HTMLelement.style.left = this.#pos[0] + "px";
    this.#HTMLelement.style.top = this.#pos[1] + "px";
  }

  accelX(dir = 1) {
    this.speed.x = this.speed.x += clampFloat(ACCEL_X * dir, MAX_ACCEL_X);

    if (this.speed.x > 0 && this.speed.x > MAX_SPEED_X) {
      this.speed.x = MAX_SPEED_X;
    } else if (this.speed.x < 0 && this.speed.x < -MAX_SPEED_X) {
      this.speed.x = -MAX_SPEED_X;
    }

    return this.speed.x;
  }

  accelY(dir = 1) {
    this.speed.y += clampFloat(ACCEL_Y * dir, MAX_ACCEL_Y);

    if (this.speed.y > MAX_SPEED_Y) {
      this.speed.y = MAX_SPEED_Y;
    }

    return this.speed.y;
  }

  /** @param {boolean} v */
  moveL(v) {
    this.moving.l = v
    if (v) {
      this.animationRemove("mov-r", "still");
      this.animationAdd("mov-l");
    } else {
      this.animationRemove("mov-l");
      this.animationAdd("still");
    }
  }

  /** @param {boolean} v */
  moveR(v) {
    this.moving.r = v;
    if (v) {
      this.animationRemove("mov-l", "still");
      this.animationAdd("mov-r");
    } else {
      this.animationRemove("mov-r");
      this.animationAdd("still");
    }
  }

  jump() {
    if (!this.jumping && this.isColliding_B()) {
      this.jumping = JUMP_H;
      this.doubleJumpEnable = true;
      this.speed.y = -MAX_JUMP_SPEED;
      this.animationAdd("jump");
    } else if (this.doubleJumpEnable) {
      this.jumping = JUMP_H;
      this.doubleJumpEnable = false;
      this.speed.y = -MAX_JUMP_SPEED;
      this.animationAdd("jump");
    }
  }

  cancelJump() {
    if (this.jumping) {
      this.jumping = 0;
      this.speed.y = 0;
      this.animationRemove("jump");
    }
  }

  // animation

  /** @param {Animation[]} ani */
  animationAdd(...ani) {
    ani.forEach(ani => this.#HTMLelement.classList.add(ani));
  }

  /** @param {Animation[]} ani */
  animationRemove(...ani) {
    ani.forEach(ani => this.#HTMLelement.classList.remove(ani));
  }

  /** @param {Animation[]} ani */
  setAnimation(...ani) {
    this.#HTMLelement.className = "uigame-player " + ani.join(" ");
  }

  // collisions

  /**
   * @param {number} x 
   * @param {number} y 
   * @returns {boolean}
   */
  #collidingAt(x, y) {
    return !this.arena.isBg(
      this.arena.at(x, y)
    )
  }

  isColliding_L() {
    let tol = 0;
    for (let wy = -1; wy <= this.size; wy++) {
      if (this.#collidingAt(this.x - 1, this.y + wy)) {
        if (++tol > COLLISION_TOL) { return true }
      }
    }
    return false;
  }

  isColliding_R() {
    let tol = 0;
    for (let wy = -1; wy <= this.size; wy++) {
      if (this.#collidingAt(this.x + this.size + 1, this.y + wy)) {
        if (++tol > COLLISION_TOL) { return true }
      }
    }
    return false;
  }

  isColliding_B() {
    for (let wx = -1; wx <= this.size; wx++) {
      if (this.#collidingAt(this.x + wx, this.y + this.size + 1)) {
        return true;
      }
    }
    return false;
  }

  isColliding_T() {
    for (let wx = -1; wx <= this.size; wx++) {
      if (this.#collidingAt(this.x + wx, this.y - 1)) {
        return true;
      }
    }
    return false;
  }

  isColliding() {
    for (let wx = -1; wx <= this.size; wx++) {
      for (let wy = -1; wy <= this.size; wy++) {
        if (this.#collidingAt(this.x + wx, this.y + wy)) {
          return true
        }
      }
    }
    return false
  }

  /** @returns {number[][]} */
  getCollisions() {
    const col = [];

    for (let wx = -INTERACT_PAD; wx < this.size + INTERACT_PAD; wx++) {
      for (let wy = -INTERACT_PAD; wy < this.size + INTERACT_PAD; wy++) {
        if (this.#collidingAt(this.x + wx, this.y + wy)) {
          col.push([this.x + wx, this.y + wy]);
        }
      }
    }

    return col;
  }

  destroy() {
    this.#HTMLelement?.remove();
  }
}
