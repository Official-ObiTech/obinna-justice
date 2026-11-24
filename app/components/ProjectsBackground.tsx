"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { onThemeChange, themeColor } from "./theme";


// Small seeded random generator, so the phones land in the same places on every visit.
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function roundedRect(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

// Floating wireframe phones behind the Projects heading. The canvas covers the heading band only.
export default function ProjectsBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // No WebGL, so the section simply has no 3D background.
    }

    const disposables: { dispose(): void }[] = [];
    const track = <T extends { dispose(): void }>(item: T) => {
      disposables.push(item);
      return item;
    };

    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0x000000, 8, 26);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    // One phone outline shared by every phone: body, screen, notch and a few content blocks.
    const bodyMaterial = track(new THREE.LineBasicMaterial({ transparent: true, opacity: 0.85 }));
    const detailMaterial = track(new THREE.LineBasicMaterial({ transparent: true, opacity: 0.4 }));

    const bodyShape = roundedRect(1, 2.05, 0.16);
    const extruded = track(new THREE.ExtrudeGeometry(bodyShape, { depth: 0.08, bevelEnabled: false, curveSegments: 10 }));
    extruded.translate(0, 0, -0.04);
    const bodyEdges = track(new THREE.EdgesGeometry(extruded, 20));

    const outline = (shape: THREE.Shape, z: number) => {
      const geometry = track(new THREE.BufferGeometry().setFromPoints(shape.getPoints(10)));
      geometry.translate(0, 0, z);
      return geometry;
    };
    const screen = outline(roundedRect(0.86, 1.9, 0.1), 0.041);
    const notch = outline(roundedRect(0.26, 0.06, 0.03), 0.041);
    notch.translate(0, 0.86, 0);
    const blocks = [
      { w: 0.7, h: 0.34, y: 0.5 },
      { w: 0.7, h: 0.16, y: 0.16 },
      { w: 0.7, h: 0.16, y: -0.06 },
      { w: 0.7, h: 0.16, y: -0.28 },
      { w: 0.5, h: 0.14, y: -0.72 },
    ].map(({ w, h, y }) => {
      const geometry = outline(roundedRect(w, h, 0.04), 0.041);
      geometry.translate(0, y, 0);
      return geometry;
    });

    const makePhone = () => {
      const phone = new THREE.Group();
      phone.add(new THREE.LineSegments(bodyEdges, bodyMaterial));
      phone.add(new THREE.LineLoop(screen, detailMaterial));
      phone.add(new THREE.LineLoop(notch, detailMaterial));
      blocks.forEach((block) => phone.add(new THREE.LineLoop(block, detailMaterial)));
      return phone;
    };

    // Scatter the phones by screen position, keeping clear of the heading text on the left.
    // Phones far back (faded by the fog) may go anywhere.
    const rand = random(7);
    const aspect = mount.clientWidth / mount.clientHeight;
    const isSmall = mount.clientWidth < 768;
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const phones: { group: THREE.Group; spin: number; bob: number; phase: number; baseY: number }[] = [];
    let attempts = 0;
    while (phones.length < (isSmall ? 6 : 16) && attempts++ < 500) {
      const z = isSmall ? -5 - rand() * 9 : 1 - rand() * 13;
      const u = rand() * 2 - 1; // -1 = left edge, 1 = right edge
      const v = rand() * 1.8 - 0.9;
      const near = z > -7;
      if (near && (isSmall ? u < 0.35 : u < 0.05)) continue;
      const halfHeight = (camera.position.z - z) * tanHalfFov;
      const x = u * halfHeight * aspect;
      const y = v * halfHeight;
      if (phones.some((p) => p.group.position.distanceTo(new THREE.Vector3(x, y, z)) < 2.2)) continue;
      const group = makePhone();
      group.position.set(x, y, z);
      group.rotation.set((rand() - 0.5) * 0.8, rand() * Math.PI * 2, (rand() - 0.5) * 0.6);
      group.scale.setScalar(isSmall ? 0.8 + rand() * 0.4 : 0.8 + rand() * 0.7);
      scene.add(group);
      phones.push({ group, spin: (rand() - 0.5) * 0.3, bob: 0.15 + rand() * 0.2, phase: rand() * Math.PI * 2, baseY: y });
    }

    // Faint drifting particles for depth.
    const particleCount = isSmall ? 120 : 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (rand() - 0.5) * 24;
      positions[i * 3 + 1] = (rand() - 0.5) * 12;
      positions[i * 3 + 2] = -rand() * 16;
    }
    const particleGeometry = track(new THREE.BufferGeometry());
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = track(
      new THREE.PointsMaterial({ size: 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true })
    );
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Colours come from the current theme: accent lines, fading into the page background.
    function applyTheme() {
      fog.color.set(themeColor("--ink"));
      const accent = themeColor("--accent");
      bodyMaterial.color.set(accent);
      detailMaterial.color.set(accent);
      particleMaterial.color.set(accent);
    }
    applyTheme();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    // Gentle parallax that follows the mouse (mouse users only).
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function render(time: number) {
      const t = reduceMotion ? 0 : time * 0.001;
      for (const p of phones) {
        p.group.rotation.y += reduceMotion ? 0 : p.spin * 0.01;
        p.group.position.y = p.baseY + Math.sin(t * 0.6 + p.phase) * p.bob;
      }
      particles.rotation.y = t * 0.015;
      camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -2);
      renderer.render(scene, camera);
    }

    function resize() {
      const width = mount!.clientWidth;
      const height = mount!.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (reduceMotion) render(0);
    }

    resize();
    const stopWatchingTheme = onThemeChange(() => {
      applyTheme();
      if (reduceMotion) render(0);
    });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // Only animate while the section is on screen (and not at all with reduced motion).
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      renderer.setAnimationLoop(entry.isIntersecting && !reduceMotion ? render : null);
    });
    visibilityObserver.observe(mount);

    return () => {
      stopWatchingTheme();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      renderer.setAnimationLoop(null);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] [mask-image:linear-gradient(to_bottom,black_70%,transparent)] md:h-[560px]"
    />
  );
}
