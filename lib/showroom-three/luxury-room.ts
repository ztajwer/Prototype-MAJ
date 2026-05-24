import * as THREE from "three";

export const ROOM_H = 4.6;
export const ROOM_D = 6.5;
const EYE_Y = 1.62;

export type RoomDimensions = { roomW: number; roomH: number };

function configureTexture(tex: THREE.Texture, anisotropy: number) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = anisotropy;
}

function photoMat(tex: THREE.Texture): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
}

function sliceMat(
  base: THREE.Texture,
  u: number,
  v: number,
  rw: number,
  rh: number
): THREE.MeshBasicMaterial {
  const tex = base.clone();
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.offset.set(u, v);
  tex.repeat.set(rw, rh);
  tex.needsUpdate = true;
  return photoMat(tex);
}

/**
 * Single seamless bbg.png front wall + b.png boutique overlay on zoom.
 * Side marble panels are part of the full bbg photo — no UV seams.
 */
export function buildLuxuryRoom(
  bbg: THREE.Texture,
  boutique: THREE.Texture
): { group: THREE.Group; eyeY: number; roomW: number; roomH: number; boutiqueOverlay: THREE.Mesh } {
  const img = bbg.image as HTMLImageElement;
  const aspect = img.width / Math.max(img.height, 1);
  const roomH = ROOM_H;
  const roomW = roomH * aspect;
  const group = new THREE.Group();

  const frontWall = new THREE.Mesh(
    new THREE.PlaneGeometry(roomW, roomH),
    photoMat(bbg)
  );
  frontWall.position.set(0, roomH / 2, 0);
  group.add(frontWall);

  const bImg = boutique.image as HTMLImageElement;
  const bAspect = bImg.width / Math.max(bImg.height, 1);
  const overlayW = roomW * 0.52;
  const overlayH = overlayW / bAspect;
  const boutiqueOverlay = new THREE.Mesh(
    new THREE.PlaneGeometry(overlayW, overlayH),
    new THREE.MeshBasicMaterial({
      map: boutique,
      transparent: true,
      opacity: 0,
      toneMapped: false,
      depthWrite: false,
    })
  );
  boutiqueOverlay.position.set(0, roomH / 2 - 0.05, -0.015);
  boutiqueOverlay.name = "boutique-overlay";
  group.add(boutiqueOverlay);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(roomW, ROOM_D),
    sliceMat(bbg, 0, 0, 1, 0.34)
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -ROOM_D / 2);
  group.add(floor);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(roomW, ROOM_D),
    sliceMat(bbg, 0, 0.66, 1, 0.34)
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, roomH, -ROOM_D / 2);
  group.add(ceiling);

  const sideH = roomH * 0.94;
  const sideGeo = new THREE.PlaneGeometry(ROOM_D, sideH);
  const sideSlice = sliceMat(bbg, 0, 0.34, 0.14, 0.58);

  const leftSide = new THREE.Mesh(sideGeo, sideSlice);
  leftSide.rotation.y = Math.PI / 2;
  leftSide.position.set(-roomW / 2, roomH / 2, -ROOM_D / 2);
  group.add(leftSide);

  const rightSide = new THREE.Mesh(
    sideGeo,
    sliceMat(bbg, 0.86, 0.34, 0.14, 0.58)
  );
  rightSide.rotation.y = -Math.PI / 2;
  rightSide.position.set(roomW / 2, roomH / 2, -ROOM_D / 2);
  group.add(rightSide);

  return { group, eyeY: EYE_Y, roomW, roomH, boutiqueOverlay };
}

export function fitCameraToFrontWall(
  camera: THREE.PerspectiveCamera,
  distance: number,
  aspect: number,
  roomW: number,
  roomH: number
) {
  const margin = 1.002;
  const vHalf = (roomH * margin) / (2 * Math.max(distance, 0.1));
  const hHalf = (roomW * margin) / (2 * Math.max(distance, 0.1));
  const neededVFovHalf = Math.max(Math.atan(vHalf), Math.atan(hHalf / Math.max(aspect, 0.01)));
  camera.fov = (2 * neededVFovHalf * 180) / Math.PI;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}

/** Fade boutique interior in as user walks forward */
export function updateBoutiqueOverlay(
  overlay: THREE.Mesh,
  cameraZ: number,
  zMin: number,
  zDefault: number
) {
  const mat = overlay.material as THREE.MeshBasicMaterial;
  const t = 1 - (cameraZ - zMin) / (zDefault - zMin);
  mat.opacity = THREE.MathUtils.clamp(t * 1.15, 0, 1);
}

export const CAMERA_Z_MIN = 2.9;
export const CAMERA_Z_MAX = 6.6;
export const CAMERA_Z_DEFAULT = 5.35;

export function loadRoomTextures(
  bbgUrl: string,
  boutiqueUrl: string,
  anisotropy: number
): Promise<{ bbg: THREE.Texture; boutique: THREE.Texture }> {
  const loader = new THREE.TextureLoader();
  const load = (url: string) =>
    new Promise<THREE.Texture>((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });

  return Promise.all([load(bbgUrl), load(boutiqueUrl)]).then(([bbg, boutique]) => {
    configureTexture(bbg, anisotropy);
    configureTexture(boutique, anisotropy);
    return { bbg, boutique };
  });
}
