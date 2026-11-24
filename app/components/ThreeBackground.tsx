"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onThemeChange, themeColor, type Theme } from "./theme";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      // No WebGL available, so the hero's plain background stays visible instead.
      return;
    }

    // Everything created on the GPU, so it can be freed on unmount.
    const disposables: { dispose(): void }[] = [];

    function generateTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 2;
      canvas.height = 2;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 1, 2, 1);
      return canvas;
    }

    function createLight(color: number) {
      const intensity = 200;
      const light = new THREE.PointLight(color, intensity, 20);

      const texture = new THREE.CanvasTexture(generateTexture());
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 4.5);

      const geometry = new THREE.SphereGeometry(2, 32, 8);
      const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        alphaMap: texture,
        alphaTest: 0.5,
      });
      disposables.push(texture, geometry, material);

      light.add(new THREE.Mesh(geometry, material));
      return light;
    }

    // Scene
    const scene = new THREE.Scene();
    const ambient = new THREE.AmbientLight(0x111122, 3);
    scene.add(ambient);

    const camera = new THREE.PerspectiveCamera(35, 1, 1, 1000);
    camera.position.set(0, 10, 40);
    camera.lookAt(0, 0, 0);

    const pointLight = createLight(0x0088ff);
    const pointLight2 = createLight(0x93c5fd);
    scene.add(pointLight, pointLight2);

    const boxGeometry = new THREE.BoxGeometry(30, 30, 30);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      side: THREE.BackSide,
    });
    disposables.push(boxGeometry, boxMaterial);
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y = 10;
    scene.add(box);

    // Dark mode: a dim room lit by the two lights. Light mode: a bright, pale room.
    function applyTheme(theme: Theme) {
      const light = theme === "light";
      renderer.setClearColor(themeColor("--ink"));
      ambient.color.set(light ? 0xffffff : 0x111122);
      ambient.intensity = light ? 2.6 : 3;
      boxMaterial.color.set(light ? 0xdfe5ee : 0xa0adaf);
    }
    applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const stopWatchingTheme = onThemeChange(applyTheme);

    // Renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    // Drag-to-orbit only with a mouse: on touch screens it would block scrolling past the hero.
    let controls: OrbitControls | null = null;
    if (window.matchMedia("(pointer: fine)").matches) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.minAzimuthAngle = -Math.PI / 4;
      controls.maxAzimuthAngle = Math.PI / 4;
      controls.minPolarAngle = Math.PI / 3;
      controls.maxPolarAngle = Math.PI / 2;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animate(time: number) {
      // With reduced motion the lights hold still at a nice-looking position.
      time = reduceMotion ? 2 : time * 0.001;

      pointLight.position.set(
        Math.sin(time * 0.6) * 9,
        Math.sin(time * 0.7) * 9 + 6,
        Math.sin(time * 0.8) * 9
      );

      pointLight2.position.set(
        Math.sin((time + 10) * 0.6) * 9,
        Math.sin((time + 10) * 0.7) * 9 + 6,
        Math.sin((time + 10) * 0.8) * 9
      );

      controls?.update();
      renderer.render(scene, camera);
    }

    function resize() {
      const width = mount!.clientWidth;
      const height = mount!.clientHeight;
      camera.aspect = width / height;
      // Widen the view on portrait screens so the room isn't cropped too tightly.
      camera.fov = camera.aspect < 1 ? 55 : 35;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // Only render while the hero is on screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      renderer.setAnimationLoop(entry.isIntersecting ? animate : null);
    });
    visibilityObserver.observe(mount);

    return () => {
      stopWatchingTheme();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      controls?.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-20" aria-hidden />;
}
