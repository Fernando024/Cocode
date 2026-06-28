"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const DEG = Math.PI / 180;

function petalShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.018, 0.025, 0.025, 0.055, 0, 0.085);
  s.bezierCurveTo(-0.025, 0.055, -0.018, 0.025, 0, 0);
  return s;
}

function makeBarkTex() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 150;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#c4a88a";
  ctx.fillRect(0, 0, 64, 128);
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 128;
    const r = 1 + Math.random() * 3;
    const v = 140 + Math.random() * 60;
    ctx.fillStyle = `rgb(${v},${v * 0.82},${v * 0.65})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 128;
    const r = 6 + Math.random() * 12;
    const v = 120 + Math.random() * 40;
    ctx.fillStyle = `rgba(${v},${v * 0.78},${v * 0.6},0.4)`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.25, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

export default function HeroAnimation({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w === 0 || h === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 30);

    const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const timer = new THREE.Timer();

    const amb = new THREE.AmbientLight(0xffe0ee, 0.9);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xffeedd, 1.8);
    key.position.set(3, 8, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffbbdd, 0.6);
    fill.position.set(-4, 3, -5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffaacc, 0.4);
    rim.position.set(0, -2, -6);
    scene.add(rim);

    // --- Tree ---
    const controls = {
      // Tronco
      trunkThickness: 1,       // grosor del tronco (1 = actual, 2 = doble)
      trunkHeight: 3,        // altura del tronco (1 = actual)
      trunkYOffset: -2,         // desplazamiento vertical del tronco (positivo = sube, negativo = baja)
      trunkBaseRadius: 0.35,   // radio base del tronco

      // Ramas
      branchThickness: 1,      // grosor de las ramas (1 = actual, 2 = doble)

      // Copa del árbol
      treeScale: .45,          // escala general del árbol (1 = tamaño original)
      treeYPos: 0,             // desplazamiento vertical del árbol (positivo = sube, negativo = baja)
      canopyScale: 1,          // multiplicador del área de la copa (1 = tamaño actual)
      canopyHeight: .3,        // altura vertical de la copa (1 = rango completo, 0.5 = mitad, 0 = solo arriba)
      petalCount: 3000,       // número total de pétalos en la copa
      petalSpread: 11,      // dispersión horizontal (mayor = más separados)
      petalVertSpread: .1,      // grosor vertical (0 = solo en puntas, negativo se invierte)
      petalYOffset: 1,         // desplazamiento vertical de todas las hojas (positivo = sube, negativo = baja)
      flatCanopy: false,        // true = lámina horizontal única (petalVertSpread controla el grosor)
      leafScale: 1,            // tamaño de las hojas (1 = actual, 2 = doble)
      petalScaleMin: 3.0,      // escala mínima del pétalo
      petalScaleMax: 5,      // escala máxima del pétalo
      petalOpacity: .9,        // opacidad (0-1)
      windSpeed: 0.3,          // velocidad del viento sobre las hojas (más bajo = más lento)
      windAmplitude: 0.05,     // intensidad del movimiento por el viento

      // Zona limpia del tronco (pétalos dentro se eliminan)
      trunkClearHeight: 1,   // altura desde donde empieza la zona limpia
      trunkClearRadius: 0.4,  // radio alrededor del tronco

      // Pétalos cayendo
      fallCount: 400,          // cantidad de pétalos cayendo
      fallSpeed: 0.15,         // velocidad de caída
      fallSpread: 3.5,           // área horizontal de dispersión
      fallDrift: 0.2,          // intensidad del viento lateral
      fallSizeMin: 0.5,        // escala mínima del pétalo cayendo
      fallSizeMax: 1.2,        // escala máxima del pétalo cayendo
    };

    const tree = new THREE.Group();
    const trunkGroup = new THREE.Group();
    trunkGroup.position.y = controls.trunkYOffset;
    tree.add(trunkGroup);
    const barkTex = makeBarkTex();
    const barkMat = new THREE.MeshLambertMaterial({ map: barkTex, color: 0x8B6B4A });

    // Trunk (segmented cylinders with taper for organic realism)
    const trunkPts = [
      new THREE.Vector3(0, -0.8 * controls.trunkHeight, 0),
      new THREE.Vector3(0.05, -0.4 * controls.trunkHeight, 0.02),
      new THREE.Vector3(-0.08, 0.0 * controls.trunkHeight, -0.02),
      new THREE.Vector3(0.15, 0.5 * controls.trunkHeight, 0.05),
      new THREE.Vector3(-0.18, 1.0 * controls.trunkHeight, -0.04),
      new THREE.Vector3(0.10, 1.5 * controls.trunkHeight, 0.03),
      new THREE.Vector3(-0.05, 2.0 * controls.trunkHeight, -0.02),
      new THREE.Vector3(0.0, 2.4 * controls.trunkHeight, 0),
    ];
    const trunkCurve = new THREE.CatmullRomCurve3(trunkPts);
    const trunkSegs = 14;
    for (let i = 0; i < trunkSegs; i++) {
      const t1 = i / trunkSegs;
      const t2 = (i + 1) / trunkSegs;
      const p1 = trunkCurve.getPoint(t1);
      const p2 = trunkCurve.getPoint(t2);
      const dir = new THREE.Vector3().copy(p2).sub(p1).normalize();
      const len = p1.distanceTo(p2);
      const r = controls.trunkBaseRadius * (1 - t1 * 0.65) * controls.trunkThickness;
      const tr = controls.trunkBaseRadius * (1 - t2 * 0.65) * controls.trunkThickness;
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(tr, r, len, 7), barkMat);
      const mid = new THREE.Vector3().copy(p1).add(p2).multiplyScalar(0.5);
      seg.position.copy(mid);
      seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      trunkGroup.add(seg);
    }

    // Petal cloud centers (along the trunk, no branches)
    const cloudCenters = [];
    const tMid = 0.6;
    const tHalf = 0.4 * controls.canopyHeight;
    const tStart = Math.max(0, tMid - tHalf);
    const tEnd = Math.min(1, tMid + tHalf);
    const centerCount = 9;
    for (let i = 0; i < centerCount; i++) {
      const t = tStart + (tEnd - tStart) * (i / (centerCount - 1 || 1));
      const p = trunkCurve.getPoint(t);
      cloudCenters.push(new THREE.Vector3(p.x, p.y, p.z));
    }
    cloudCenters.push(new THREE.Vector3(0, 2.2, 0));

    // --- Blossoms ---
    const blossomColors = [
      "#ffb7c5", "#ffc0cb", "#ffaab8", "#ff8a9f",
      "#ffd1dc", "#ffe4e9", "#ff9eb5", "#ffccd5",
      "#ff7a9e", "#ffb0c3",
    ];

    const petalGeo = new THREE.ShapeGeometry(petalShape());
    const petalCols = blossomColors.map(c => new THREE.Color(c));

    const bMat = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0,
      transparent: true,
      opacity: controls.petalOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const bMesh = new THREE.InstancedMesh(petalGeo, bMat, controls.petalCount);
    bMesh.frustumCulled = false;
    const dummy = new THREE.Object3D();
    const tmpCol = new THREE.Color();

    let idx = 0;
    const petalData = [];

    const nPerCenter = Math.floor(controls.petalCount / cloudCenters.length);
    const flatBaseY = cloudCenters.reduce((s, c) => s + c.y, 0) / cloudCenters.length;
    const cyMin = Math.min(...cloudCenters.map(c => c.y));
    const cyMax = Math.max(...cloudCenters.map(c => c.y));
    const cyRange = cyMax - cyMin || 1;

    cloudCenters.forEach((center) => {
      const heightT = 1 - (center.y - cyMin) / cyRange; // 0=arriba, 1=abajo
      const spreadMult = 0.2 + heightT * 0.8; // 0.2 arriba, 1.0 abajo
      for (let i = 0; i < nPerCenter && idx < controls.petalCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.25) * controls.petalSpread * 0.5 * controls.canopyScale * spreadMult;
        let x = center.x + Math.cos(angle) * dist;
        let y = controls.flatCanopy
          ? flatBaseY + (Math.random() - 0.5) * Math.abs(controls.petalVertSpread) + controls.petalYOffset
          : center.y - Math.random() * Math.abs(controls.petalVertSpread) + controls.petalYOffset;
        let z = center.z + Math.sin(angle) * dist;

        if (Math.sqrt(x * x + z * z) < controls.trunkClearRadius) continue;

        dummy.position.set(x, y, z);
        dummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
        const sc = (controls.petalScaleMin + Math.random() * (controls.petalScaleMax - controls.petalScaleMin)) * controls.leafScale;
        dummy.scale.set(sc, sc, sc);
        dummy.updateMatrix();
        bMesh.setMatrixAt(idx, dummy.matrix);

        tmpCol.copy(petalCols[Math.floor(Math.random() * petalCols.length)]);
        tmpCol.multiplyScalar(0.65 + Math.random() * 0.5);
        bMesh.setColorAt(idx, tmpCol);

        petalData.push({ x, y, z, rx: dummy.rotation.x, ry: dummy.rotation.y, rz: dummy.rotation.z, sc, phase: Math.random() * Math.PI * 2 });
        idx++;
      }
    });
    bMesh.count = idx;
    bMesh.instanceMatrix.needsUpdate = true;
    bMesh.instanceColor.needsUpdate = true;
    tree.add(bMesh);

    // --- Falling petals ---
    const FALL_COUNT = controls.fallCount;
    const fallMat = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0,
      transparent: true,
      opacity: controls.petalOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const fallMesh = new THREE.InstancedMesh(petalGeo, fallMat, FALL_COUNT);
    fallMesh.frustumCulled = false;
    const fallDummy = new THREE.Object3D();
    const fallData = [];

    for (let i = 0; i < FALL_COUNT; i++) {
      const fx = (Math.random() - 0.5) * controls.fallSpread;
      const fy = -1.5 + Math.random() * 6;
      const fz = (Math.random() - 0.5) * controls.fallSpread;
      const fsc = controls.fallSizeMin + Math.random() * (controls.fallSizeMax - controls.fallSizeMin);

      fallData.push({
        x: fx, y: fy, z: fz,
        speed: controls.fallSpeed * (0.7 + Math.random() * 0.6),
        drift: controls.fallDrift * (0.5 + Math.random() * 0.5),
        phase: Math.random() * Math.PI * 2,
        rotSpd: 0.5 + Math.random() * 2,
        rotPh: Math.random() * Math.PI * 2,
        sc: fsc,
      });

      fallDummy.position.set(fx, fy, fz);
      fallDummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      fallDummy.scale.set(fsc, fsc, fsc);
      fallDummy.updateMatrix();
      fallMesh.setMatrixAt(i, fallDummy.matrix);

      tmpCol.copy(petalCols[Math.floor(Math.random() * petalCols.length)]);
      fallMesh.setColorAt(i, tmpCol);
    }
    fallMesh.count = FALL_COUNT;
    fallMesh.instanceMatrix.needsUpdate = true;
    fallMesh.instanceColor.needsUpdate = true;
    scene.add(fallMesh);

    tree.scale.set(0.6 * controls.treeScale, 0.45 * controls.treeScale, 0.5 * controls.treeScale);
    tree.position.set(0, -1.35 + controls.treeYPos, 0);
    scene.add(tree);

    // --- Resize ---
    const resize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // --- Animate ---
    camera.position.set(0, 0.3, 3.0);
    camera.lookAt(0, -0.8, 0);

    function animate() {
      requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();
      const dt = timer.getDelta();

      const windSpeed = controls.windSpeed;
      const windAmp = controls.windAmplitude;
      for (let i = 0; i < idx; i++) {
        const d = petalData[i];
        const w = Math.sin(t * windSpeed + d.phase);
        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(d.rx + w * 0.3, d.ry + w * 0.5, d.rz + w);
        dummy.scale.set(d.sc, d.sc, d.sc);
        dummy.updateMatrix();
        bMesh.setMatrixAt(i, dummy.matrix);
      }
      bMesh.instanceMatrix.needsUpdate = true;

      for (let i = 0; i < FALL_COUNT; i++) {
        const d = fallData[i];
        d.y -= d.speed * dt;
        const drX = Math.sin(t * 0.5 + d.phase) * d.drift;
        const drZ = Math.cos(t * 0.4 + d.phase) * d.drift;

        if (d.y < -2) {
          d.y = 3 + Math.random() * 3;
          d.x = (Math.random() - 0.5) * controls.fallSpread;
          d.z = (Math.random() - 0.5) * controls.fallSpread;
        }

        fallDummy.position.set(d.x + drX, d.y, d.z + drZ);
        fallDummy.rotation.set(
          Math.sin(t * d.rotSpd + d.rotPh) * 1.5,
          t * d.rotSpd * 0.3,
          Math.cos(t * d.rotSpd * 0.7 + d.rotPh) * 1.5
        );
        fallDummy.scale.set(d.sc, d.sc, d.sc);
        fallDummy.updateMatrix();
        fallMesh.setMatrixAt(i, fallDummy.matrix);
      }
      fallMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      ro.disconnect();
      renderer.dispose();
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      el.width = 0;
      el.height = 0;
    };
  }, []);

  return <canvas ref={ref} className={className} />;
}
