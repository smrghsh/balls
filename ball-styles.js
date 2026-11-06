// Procedural ball looks (equirectangular canvas textures, 256x128): sports balls and a few
// pop-culture lookalikes. Shared by the far-wall scene (web/back/balls.js) and the phone page
// that lets a visitor drop one (the smrghsh/balls repo, published at smrghsh.github.io/balls).
export function drawStyle(style) {   // -> a 256x128 canvas with the texture painted
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  style.draw(c.getContext('2d'), 256, 128);
  return c;
}
export function makeTexture(THREE, style) {
  const t = new THREE.CanvasTexture(drawStyle(style)); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 2;
  return t;
}
const seam = (g, color, w) => { g.strokeStyle = color; g.lineWidth = w; };
export const STYLES = [
  { name: 'capture', rough: 0.35, metal: 0.05, draw: (g, W, H) => {      // red top, white bottom, black band + button
    g.fillStyle = '#e8352b'; g.fillRect(0, 0, W, H / 2); g.fillStyle = '#f4f4f4'; g.fillRect(0, H / 2, W, H / 2);
    g.fillStyle = '#1b1b1b'; g.fillRect(0, H / 2 - 5, W, 10);
    g.beginPath(); g.arc(W / 2, H / 2, 16, 0, 7); g.fill(); g.fillStyle = '#f4f4f4'; g.beginPath(); g.arc(W / 2, H / 2, 10, 0, 7); g.fill();
  } },
  { name: 'stars', rough: 0.25, metal: 0.0, draw: (g, W, H) => {         // orange glass with red stars
    g.fillStyle = '#f7a21b'; g.fillRect(0, 0, W, H);
    const n = 1 + Math.floor(Math.random() * 7); g.fillStyle = '#d6301f';
    for (let i = 0; i < n; i++) star(g, W * 0.5 + Math.cos(i * 2.1) * 34, H * 0.5 + Math.sin(i * 2.1) * 20, 9);
  } },
  { name: 'basketball', rough: 0.8, metal: 0, draw: (g, W, H) => {
    g.fillStyle = '#d9752b'; g.fillRect(0, 0, W, H); seam(g, '#1a1a1a', 4);
    g.beginPath(); g.moveTo(0, H / 2); g.lineTo(W, H / 2); g.stroke();
    for (const x of [W * 0.25, W * 0.75]) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.beginPath(); g.moveTo(0, H * 0.2); g.quadraticCurveTo(W / 2, H * 0.5, W, H * 0.2); g.stroke();
    g.beginPath(); g.moveTo(0, H * 0.8); g.quadraticCurveTo(W / 2, H * 0.5, W, H * 0.8); g.stroke();
  } },
  { name: 'soccer', rough: 0.6, metal: 0, draw: (g, W, H) => {
    g.fillStyle = '#f2f2f2'; g.fillRect(0, 0, W, H); g.fillStyle = '#111';
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) poly(g, (i + (j % 2) * 0.5) * (W / 6), H * (0.2 + j * 0.3), 13, 5);
  } },
  { name: 'tennis', rough: 0.95, metal: 0, draw: (g, W, H) => {
    g.fillStyle = '#d4e82a'; g.fillRect(0, 0, W, H); seam(g, '#f6f6f6', 6);
    g.beginPath(); g.moveTo(0, H * 0.3); g.bezierCurveTo(W * 0.3, H * 0.9, W * 0.7, H * 0.1, W, H * 0.7); g.stroke();
  } },
  { name: 'baseball', rough: 0.7, metal: 0, draw: (g, W, H) => {
    g.fillStyle = '#f5f1e6'; g.fillRect(0, 0, W, H); seam(g, '#c8102e', 3);
    g.beginPath(); g.moveTo(0, H * 0.35); g.bezierCurveTo(W * 0.3, H * 0.85, W * 0.7, H * 0.15, W, H * 0.65); g.stroke();
    g.lineWidth = 2; for (let x = 0; x < W; x += 12) { g.beginPath(); g.moveTo(x, H * 0.35 + Math.sin(x / 20) * 10); g.lineTo(x + 6, H * 0.35 + Math.sin(x / 20) * 10 + 8); g.stroke(); }
  } },
  { name: 'eight', rough: 0.15, metal: 0.1, draw: (g, W, H) => {
    g.fillStyle = '#101010'; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; g.beginPath(); g.arc(W / 2, H / 2, 22, 0, 7); g.fill();
    g.fillStyle = '#101010'; g.font = 'bold 30px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('8', W / 2, H / 2 + 1);
  } },
  { name: 'golf', rough: 0.5, metal: 0, draw: (g, W, H) => {
    g.fillStyle = '#fafafa'; g.fillRect(0, 0, W, H); g.fillStyle = '#d8d8d8';
    for (let i = 0; i < 160; i++) { g.beginPath(); g.arc(Math.random() * W, Math.random() * H, 3, 0, 7); g.fill(); }
  } },
  { name: 'beach', rough: 0.4, metal: 0, draw: (g, W, H) => {
    const cols = ['#f23a3a', '#f2d13a', '#3aa6f2', '#f7f7f7', '#3af28f', '#f78b3a'];
    for (let i = 0; i < 6; i++) { g.fillStyle = cols[i]; g.fillRect((i * W) / 6, 0, W / 6 + 1, H); }
  } },
  { name: 'bowling', rough: 0.1, metal: 0.2, draw: (g, W, H) => {
    g.fillStyle = '#2b1d4e'; g.fillRect(0, 0, W, H); g.fillStyle = '#0a0a0a';
    for (const [x, y] of [[W * 0.45, H * 0.4], [W * 0.55, H * 0.4], [W * 0.5, H * 0.55]]) { g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); }
  } },
  { name: 'volleyball', rough: 0.6, metal: 0, draw: (g, W, H) => {
    g.fillStyle = '#f2f2f2'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#1f4ea1'; g.fillRect(0, H * 0.33, W, H * 0.12); g.fillStyle = '#f2c42c'; g.fillRect(0, H * 0.55, W, H * 0.12);
  } },
];
function star(g, x, y, r) { g.beginPath(); for (let i = 0; i < 10; i++) { const a = (i * Math.PI) / 5 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); g.fill(); }
function poly(g, x, y, r, n) { g.beginPath(); for (let i = 0; i < n; i++) { const a = (i * 2 * Math.PI) / n - Math.PI / 2; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath(); g.fill(); }

// cutBelowPipe: the wall below the pipe is black (the real pipe is the pipe): no floor, no virtual pipe,
// balls fall off into the dark and recycle.
// cutL / cutR: fractions of the width trimmed off each side; the balls' side walls sit at the visible edges.
