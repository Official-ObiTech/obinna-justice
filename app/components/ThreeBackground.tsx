"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let pointLight: THREE.PointLight;
    let pointLight2: THREE.PointLight;

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

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(2, 32, 8),
        new THREE.MeshPhongMaterial({
          side: THREE.DoubleSide,
          alphaMap: texture,
          alphaTest: 0.5,
        })
      );

      light.add(glow);
      return light;
    }

    // Scene
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x111122, 3));

    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 10, 40);

    pointLight = createLight(0x0088ff);
    pointLight2 = createLight(0xff8888);
    scene.add(pointLight, pointLight2);

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(30, 30, 30),
      new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        side: THREE.BackSide,
      })
    );
    box.position.y = 10;
    scene.add(box);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000);

    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    function animate(time: number) {
      time *= 0.001;

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

      renderer.render(scene, camera);
      renderer.setAnimationLoop(animate);
    }

    renderer.setAnimationLoop(animate);

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-screen h-screen -z-10"
    />
  );
}
