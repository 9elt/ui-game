/**
 * @param {number} v 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function clampInt(v, min, max) {
  let x = Math.round(v)
  return x < min ? min : x > max ? max : x
}

/**
 * @param {number} v 
 * @param {number} max 
 * @returns {number}
 */
export function clampFloat(v, max) {
  return v > 0
    ? v > max ? max : v
    : v < -max ? -max : v
}
