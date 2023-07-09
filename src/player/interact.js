/** @typedef {import('../player').default} Player */
/** @typedef {import('../score').default} Score */

/**
 * @param {Player} player
 * @param {Score} score
 */
export default function interact(player, score) {
  let elementHistory = [];
  let elementQueue = [];

  return () => {
    if (!player.isColliding()) { return }

    player.getCollisions().forEach(([x, y]) => {
      let land = document.elementFromPoint(x, y);

      if (
        land !== document.body &&
        !elementHistory.includes(land)
      ) {
        elementHistory.push(land);
        elementQueue.push(land);
      }

    })

    while (elementQueue != 0) {
      const elem = elementQueue.pop();

      if (typeof elem.click == "function") {
        elem.click();
        score.incr(10);
      }

      if (typeof elem.focus == "function") {
        elem.focus();
        score.incr(10);
      }

      
    }
  }
}
