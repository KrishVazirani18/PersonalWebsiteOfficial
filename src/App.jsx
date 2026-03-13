import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 80;

const globalMouse = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

const Swarm = () => {
  const group = useRef();
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targetRotation = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 1
      ),
      velocity: new THREE.Vector3(0, 0, 0),
    }));
  }, []);

  useFrame(() => {
    if (!mesh.current || !group.current) return;

    targetRotation.current.y = (globalMouse.x * Math.PI) / 3;
    targetRotation.current.x = (-globalMouse.y * Math.PI) / 3;

    group.current.rotation.y += (targetRotation.current.y - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetRotation.current.x - group.current.rotation.x) * 0.06;

    const center = new THREE.Vector3(0, 0, 0);

    particles.forEach((p, i) => {
      // gentle pull toward center
      const toCenter = center.clone().sub(p.position).multiplyScalar(0.0005);
      p.velocity.add(toCenter);

      // soft separation
      for (let j = 0; j < particles.length; j++) {
        if (i === j) continue;
        const diff = p.position.clone().sub(particles[j].position);
        const dist = diff.length();
        if (dist < 0.3 && dist > 0) {
          p.velocity.add(diff.normalize().multiplyScalar(0.00005));
        }
      }

      // strong damping keeps things calm
      p.velocity.multiplyScalar(0.98);
      p.position.add(p.velocity);

      dummy.position.copy(p.position);
      dummy.scale.setScalar(0.025);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[null, null, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#18181b" />
      </instancedMesh>
    </group>
  );
};

const App = () => {
  return (
    <div className="bg-white text-zinc-900 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row md:items-center md:min-h-screen gap-12">

        <div className="md:w-2/5 shrink-0">
          <h1 className="text-lg font-semibold mb-8">Krish Vazirani</h1>

          <div className="space-y-6 text-[15px] leading-relaxed text-zinc-700">
            <p>
              Hey, I'm Krish. I like working on things that don't immediately make sense. Ideas most people would wave off.
            </p>

            <p>
              In 2024, I sold my first company for six figures. It helped realtors in the Silicon Valley market work faster.
            </p>

            <p>
              From 2025 to 2026, I worked in venture capital. Tracked deals, spoke to founders, helped portfolio companies, and built tech to make VCs more efficient. Taught me a lot. I was also running a product development firm on the side.
            </p>

            <p>
              Now I'm building <a href="https://useswarm.co" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors">Swarm</a>, which simulates user behavior at scale.
            </p>
          </div>

          <div className="mt-12 space-y-1 text-sm text-zinc-700">
            <p>
              <a href="https://linkedin.com/in/krish-vazirani-814511236" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors">LinkedIn</a>
            </p>
            <p>
              krishvazirani1018 [at] gmail [dot] com
            </p>
          </div>
        </div>

        <div className="md:w-3/5 h-[400px] md:h-[600px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
            <Swarm />
          </Canvas>
        </div>

      </div>
    </div>
  );
};

export default App;
