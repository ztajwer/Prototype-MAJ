import * as THREE from "three";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Ivory marble with subtle warm veins — seamless tile */
export function createMarbleTexture(
  size = 512,
  seed = 42
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const rand = mulberry32(seed);
  const base = ctx.createLinearGradient(0, 0, size, size);
  base.addColorStop(0, "#f8f5f0");
  base.addColorStop(0.45, "#f3efe8");
  base.addColorStop(1, "#ebe4da");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 18; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const len = 80 + rand() * 220;
    const angle = rand() * Math.PI;
    const grad = ctx.createLinearGradient(
      x,
      y,
      x + Math.cos(angle) * len,
      y + Math.sin(angle) * len
    );
    grad.addColorStop(0, "rgba(210, 195, 175, 0)");
    grad.addColorStop(0.35, "rgba(195, 178, 155, 0.22)");
    grad.addColorStop(0.65, "rgba(180, 162, 140, 0.12)");
    grad.addColorStop(1, "rgba(210, 195, 175, 0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.2 + rand() * 2.4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + rand() * 60 - 30,
      y + rand() * 60 - 30,
      x + Math.cos(angle) * len * 0.6,
      y + Math.sin(angle) * len * 0.6,
      x + Math.cos(angle) * len,
      y + Math.sin(angle) * len
    );
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Floor reflection gradient — darker toward back wall */
export function createFloorReflectionTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, "#ddd5c8");
  grad.addColorStop(0.35, "#ece6dc");
  grad.addColorStop(0.7, "#f4efe8");
  grad.addColorStop(1, "#faf7f2");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.globalAlpha = 0.08;
  for (let y = 0; y < size; y += 4) {
    ctx.fillStyle = y % 8 === 0 ? "#fff" : "#000";
    ctx.fillRect(0, y, size, 1);
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createGoldNormalMap(size = 64): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8080ff";
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}
