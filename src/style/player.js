export const playerStyle = `
.uigame-player {
    pointer-events: none;
    z-index: 9999999;
    position: absolute;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.uigame-player > svg {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    transition: all 250ms ease-in;
    filter: drop-shadow(0 6px 8px #5598E850);
}

.d-black{ fill:#121212; filter: drop-shadow(0 0 2px #1C1C1C); }
.l-black{ fill:#1a1a1a; }
.blue{ fill:#1877EA; filter: drop-shadow(0 0 0.75px #006ff6); } /*1877EA*/
.skin{ fill:#F2E2D1; }

.band-f-4,
.band-f-3,
.band-f-2,
.band-f-1,
.arm-L,
.arm-R,
.foot-L,
.foot-L,
.foot-R {
    transform-box: fill-box;
    transform-origin: center;
}

.uigame-player .eye-L,
.uigame-player .eye-R,
.uigame-player .pupil-L,
.uigame-player .pupil-R,
.uigame-player .face {
    transition: all 150ms ease-in;
}

/* still */

@keyframes bandStill {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(calc(24deg * var(--dir))); }
    100% { transform: rotate(0deg); }
}

@keyframes armStill {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(calc(12deg * var(--dir))); }
    100% { transform: rotate(0deg); }
}

.uigame-player.still .band-f-1 {
    --dir: 1;
    animation: bandStill 3s ease-in-out infinite reverse;
}

.uigame-player.still .band-f-2 {
    --dir: 1;
    animation: bandStill 2s ease-in-out infinite;
}

.uigame-player.still .band-f-3 {
    --dir: -1;
    animation: bandStill 4s ease-in-out infinite;
}

.uigame-player.still .band-f-4 {
    display: none;
}

.uigame-player.still .arm-L {
    --dir: 1;
    animation: armStill 3s ease-in-out infinite;
}

.uigame-player.still .arm-R {
    --dir: -1;
    animation: armStill 3s ease-in-out infinite reverse;
}


/* mov l */

@keyframes bandExpandMovL {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(1px * var(--exp))); }
}

@keyframes armMovL {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(calc(32deg * var(--dir))); }
    100% { transform: rotate(0deg); }
}

@keyframes footMovL {
    0% { transform: translateY(-1px); }
    50% { transform: translateY(+1px); }
    100% { transform: translateY(-1px); }
}

.uigame-player.mov-l > svg {
    transform: translateX(-12px);
}

.uigame-player.mov-l .eye-L,
.uigame-player.mov-l .eye-R,
.uigame-player.mov-l .pupil-L,
.uigame-player.mov-l .pupil-R,
.uigame-player.mov-l .face {
    transform: translateX(-3px);
}

.uigame-player.mov-l .band-f-1 {
    --dir: 1;
    --exp: 1;
    animation: bandExpandMovL 0.25s ease-in 1 forwards;
}

.uigame-player.mov-l .band-f-2 {
    --dir: 1;
    --exp: 3;
    animation: bandExpandMovL 0.25s ease-in 1 forwards;
}

.uigame-player.mov-l .band-f-3 {
    --dir: -1;
    --exp: 3;
    animation: bandExpandMovL 0.25s ease-in 1 forwards;
}

.uigame-player.mov-l .band-f-4 {
    --dir: -1;
    --exp: 9;
    animation: bandExpandMovL 0.25s ease-in 1 forwards;
}

.uigame-player.mov-l .arm-L {
    --dir: 1;
    animation: armMovL 1s ease-out infinite;
}

.uigame-player.mov-l .arm-R {
    --dir: -1;
    animation: armMovL 1s ease-out infinite reverse;
}

.uigame-player.mov-l .foot-L {
    --dir: 1;
    animation: footMovL 1s ease-out infinite;
}

.uigame-player.mov-l .foot-R {
    --dir: 1;
    animation: footMovL 1s ease-out infinite reverse;
}

/* mov l */

@keyframes bandExpandMovR {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(1px * var(--exp))); }
}

@keyframes armMovR {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(calc(32deg * var(--dir))); }
    100% { transform: rotate(0deg); }
}

@keyframes footMovR {
    0% { transform: translateY(-1px); }
    50% { transform: translateY(+1px); }
    100% { transform: translateY(-1px); }
}

.uigame-player.mov-r > svg {
    transform: translateX(10px);
}

.uigame-player.mov-r .eye-L,
.uigame-player.mov-r .eye-R,
.uigame-player.mov-r .pupil-L,
.uigame-player.mov-r .pupil-R,
.uigame-player.mov-r .face {
    transform: translateX(4px);
}

.uigame-player.mov-r .band-f-1 {
    --dir: 1;
    --exp: -37;
    animation: bandExpandMovR 0.25s ease-in 1 forwards;
}

.uigame-player.mov-r .band-f-2 {
    --dir: 1;
    --exp: -48;
    animation: bandExpandMovR 0.25s ease-in 1 forwards;
}

.uigame-player.mov-r .band-f-3 {
    --dir: -1;
    --exp: -48;
    animation: bandExpandMovR 0.25s ease-in 1 forwards;
}

.uigame-player.mov-r .band-f-4 {
    --dir: -1;
    --exp: -57;
    animation: bandExpandMovR 0.25s ease-in 1 forwards;
}

.uigame-player.mov-r .arm-L {
    --dir: 1;
    animation: armMovR 1s ease-out infinite;
}

.uigame-player.mov-r .arm-R {
    --dir: -1;
    animation: armMovR 1s ease-out infinite reverse;
}


.uigame-player.mov-r .foot-L {
    --dir: 1;
    animation: footMovR 1s ease-out infinite;
}

.uigame-player.mov-r .foot-R {
    --dir: 1;
    animation: footMovR 1s ease-out infinite reverse;
}


/* jump */

.uigame-player.jump > svg {
    transform: translateY(-4px);
}

@keyframes armJump {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(calc(44deg * var(--dir))); }
}

@keyframes footJump {
    0% { transform: translateY(-1px); }
    100% { transform: translateY(3px); }
}

.uigame-player.jump .arm-L {
    --dir: 1;
    animation: armJump 0.15s ease-out 1 forwards;
    transition: all 250ms ease-out;
}

.uigame-player.jump .arm-R {
    --dir: -1;
    animation: armJump 0.15s ease-out 1 forwards;
    transition: all 250ms ease-out;
}

.uigame-player.jump .foot-L {
    --dir: 1;
    animation: footJump 0.15s ease-in 1 forwards;
}

.uigame-player.jump .foot-R {
    --dir: 1;
    animation: footJump 0.15s ease-in 1 forwards;
}`;