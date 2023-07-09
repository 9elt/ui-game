/** @typedef {() => void} f */

/**
 * @param {{KeyE: f, Space: f, KeyA: f, KeyD: f}} keydown 
 * @param {{Space: f, KeyA: f, KeyD: f}} keyup 
 */
export default function controls(keydown, keyup) {
  window.addEventListener("keydown", e => {
    if (typeof keydown[e.code] === "function") {
      e.preventDefault()
      keydown[e.code]()
    }
  })

  window.addEventListener("keyup", e => {
    if (typeof keyup[e.code] === "function") {
      e.preventDefault()
      keyup[e.code]()
    }
  })
}
