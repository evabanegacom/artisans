import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { state } from './store';
import { Overlay } from './design-preview';

const CanvasApp = ({ position = [0, 0, 5], fov = 35, preferred, fill }: any) => (
  <div id="canvas-container" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('canvas-container') as any} eventPrefix="client">
      <ambientLight intensity={0.5} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt preferred={preferred} fill={fill} />
        </Center>
      </CameraRig>
    </Canvas>
    <Overlay />
  </div>
);

function Backdrop() {
  const shadows: any = useRef();
  useFrame((state: any, delta) => {
    if (shadows.current) {
      easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta);
    }
  });
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }: any) {
  const group: any = useRef();
  const snap: any = useSnapshot(state);
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 5], 0.25, delta);
    if (group.current) {
      easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta);
    }
  });
  return <group ref={group}>{children}</group>;
}

function Shirt(props: any) {
  const { preferred, fill } = props;
  const snap = useSnapshot(state);
  const texture = useTexture(preferred || '/react.png');
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb') as any;

  useFrame((state, delta) => {
    if (materials && materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  if (!nodes || !materials) {
    return null;
  }

  if (fill) {
    // Use the texture as the material for the entire t-shirt
    materials.lambert1.map = texture;
    materials.lambert1.needsUpdate = true;
  }

  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null} scale={[3.0, 3.0, 3.0]}>
      {!fill && <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.20} map={texture as any} />}
    </mesh>
  );
}

useGLTF.preload('/shirt_baked_collapsed.glb');
['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload);

export default CanvasApp;
