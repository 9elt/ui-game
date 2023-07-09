import { playerStyle } from "./player";
import { scoreStyle } from "./score";

export default function style() {
  const style = document.createElement("style");
  style.innerHTML = scoreStyle + playerStyle;
  document.head.append(style);
}
//.uigame-player