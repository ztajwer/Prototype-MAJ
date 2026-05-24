"use client";

import {
  buildLuxuryRoom,
  CAMERA_Z_DEFAULT,
  CAMERA_Z_MAX,
  CAMERA_Z_MIN,
  fitCameraToFrontWall,
  loadRoomTextures,
  updateBoutiqueOverlay,
} from "@/lib/showroom-three/luxury-room";
import { SHOWROOM_BG, SHOWROOM_CORRIDOR_BG } from "@/lib/media";
import gsap from "gsap";
import { motion } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";

export type ShowroomCanvas3DHandle = {
  zoomBy: (delta: number) => void;
};

export const ShowroomCanvas3D = forwardRef<ShowroomCanvas3DHandle>(
  function ShowroomCanvas3D(_props, ref) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const targetZRef = useRef(CAMERA_Z_DEFAULT);
    const quickZoomRef = useRef<gsap.QuickToFunc | null>(null);

    useImperativeHandle(ref, () => ({
      zoomBy(delta: number) {
        const next = Math.min(
          CAMERA_Z_MAX,
          Math.max(CAMERA_Z_MIN, targetZRef.current - delta * 0.0035)
        );
        targetZRef.current = next;
        quickZoomRef.current?.(next);
      },
    }));

    useEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      let disposed = false;
      let raf = 0;
      let roomGroup: THREE.Group | null = null;
      let boutiqueOverlay: THREE.Mesh | null = null;
      let roomW = 8.2;
      let roomH = 4.6;
      const eyeYRefLocal = { current: 1.62 };

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f2ed);

      const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 30);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0xf5f2ed, 1);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = "showroom-three-room__canvas";
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      wrap.insertBefore(renderer.domElement, wrap.firstChild);

      const resize = () => {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        fitCameraToFrontWall(camera, camera.position.z, w / h, roomW, roomH);
      };

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      loadRoomTextures(
        SHOWROOM_CORRIDOR_BG,
        SHOWROOM_BG,
        renderer.capabilities.getMaxAnisotropy()
      )
        .then(({ bbg, boutique }) => {
          if (disposed) return;

          const built = buildLuxuryRoom(bbg, boutique);
          roomGroup = built.group;
          boutiqueOverlay = built.boutiqueOverlay;
          roomW = built.roomW;
          roomH = built.roomH;
          eyeYRefLocal.current = built.eyeY;

          scene.add(built.group);
          camera.position.set(0, built.eyeY, CAMERA_Z_DEFAULT);
          camera.lookAt(0, built.eyeY, 0);

          quickZoomRef.current = gsap.quickTo(camera.position, "z", {
            duration: 0.95,
            ease: "power3.out",
          });

          resize();
        })
        .catch(() => {});

      const render = () => {
        if (disposed) return;
        camera.lookAt(0, eyeYRefLocal.current, 0);
        if (boutiqueOverlay) {
          updateBoutiqueOverlay(
            boutiqueOverlay,
            camera.position.z,
            CAMERA_Z_MIN,
            CAMERA_Z_DEFAULT
          );
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);

      return () => {
        disposed = true;
        ro.disconnect();
        cancelAnimationFrame(raf);
        quickZoomRef.current = null;
        gsap.killTweensOf(camera.position);
        renderer.dispose();
        if (renderer.domElement.parentNode === wrap) {
          wrap.removeChild(renderer.domElement);
        }
        if (roomGroup) {
          roomGroup.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry.dispose();
              const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
              mats.forEach((m) => {
                if ("map" in m && m.map) m.map.dispose();
                m.dispose();
              });
            }
          });
        }
      };
    }, []);

    return (
      <motion.div
        ref={wrapRef}
        className="showroom-three-room absolute inset-0 z-[1] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          aria-hidden
          className="showroom-three-room__vignette pointer-events-none absolute inset-0 z-[2]"
        />
      </motion.div>
    );
  }
);
