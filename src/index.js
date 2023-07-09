import Player from "./player";
import Arena from "./arena";
import Score from "./score";
import Physics from "./physics";

import loadStyle from "./style";
import loadControls from "./controls";
import interact from "./player/interact";

/** @param {() => void} onLoad */
const startController = (onLoad) => {
  window.addEventListener("keydown", e => {
    if (e.code !== "KeyM" || !e.ctrlKey) { return }
    e.preventDefault();
    onLoad();
  })
}

(async () => {

  loadStyle()

  const arena = await Arena.initialize();

  const score = Score.initialize();
  const player = Player.initialize(arena);
  const physics = Physics.initialize(player);

  return { player, physics, score }

})().then(({ player, physics, score }) => startController(() => {

  loadControls(
    {
      KeyA: () => player.moveL(true),
      KeyD: () => player.moveR(true),
      Space: () => player.jump(),
      KeyE: interact(player, score),
    },
    {
      KeyA: () => player.moveL(false),
      KeyD: () => player.moveR(false),
      Space: () => player.cancelJump(),
    }
  )

  physics.run();

})).catch(e => console.log("UI GAME FAILED", e));
