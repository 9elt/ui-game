export default function style() {

  const style = document.createElement("style");

  style.innerHTML = `
  .uigame-score {
    position: fixed;
    top: 0;
    right: 0;
    padding: 8px 32px;
    color: #333;
    background-color: #fffa;
    z-index: 9999999;
  }

  .uigame-player {
    pointer-events: none;
    z-index: 9999999;
    position: absolute;
    width: 48px;
    height: 48px;
    overflow: hidden;
    background-color: #fff1;
  }`;

  document.head.append(style);
}
