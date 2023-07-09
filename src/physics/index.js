import Player from "../player";

export default class Physics {
  #run;
  constructor() { }

  /**
   * 
   * @param {Player} player 
   * @returns 
   */
  static initialize(player) {
    const physics = new Physics();

    physics.#run = () => {

      // x movement

      if ((player.moving.l || player.moving.r) && !(player.moving.l && player.moving.r)) {

        if (player.moving.l) {

          if (!player.isColliding_L()) {

            if (player.speed.x > 0) { player.speed.x = 0 }
            player.setX(x => x + player.accelX(-1));

          } else {
            player.speed.x = 0;
          }

        } else if (player.moving.r) {

          if (!player.isColliding_R()) {

            if (player.speed.x < 0) { player.speed.x = 0 }
            player.setX(x => x + player.accelX(1));

          } else {

            player.speed.x = 0;
          }
        }

      } else {

        if (player.speed.x) {

          if (player.isColliding_B()) {

            player.speed.x = 0;

          } else if (player.speed.x < 0) {

            if (!player.isColliding_L()) {
              player.setX(x => x + player.accelX(+1));
            }

          } else {

            if (!player.isColliding_R()) {
              player.setX(x => x + player.accelX(-1));
            }

          }
        }

      }


      // y movement


      if (player.jumping && player.speed.y < 0) {

        player.setY(y => y + player.accelY(-0.1));
        --player.jumping;

        if (player.isColliding_T()) {
          player.jumping = 0;
          player.speed.y = 0;
          player.animationRemove("jump")
        }

      } else if (!player.isColliding_B()) {

        if (player.speed.y < 0) { player.speed.y = 0 }
        player.setY(y => y + player.accelY(1));

      } else {
        player.speed.y = 0;
        player.animationRemove("jump")
      }


      // render


      player.render();

      requestAnimationFrame(physics.#run);
    }


    return physics;
  }

  run() {
    this.#run();
  }
}
