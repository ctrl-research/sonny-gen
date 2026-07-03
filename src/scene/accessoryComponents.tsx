import type { FC } from 'react';
import type { AccessoryId } from '../types';
import { useColor } from './useColor';

// Each accessory renders in local space assuming its parent group is already positioned at
// the correct anchor on the figure (see Accessories.tsx). Meshes tint from colour groups.

const HatAccessory: FC = () => {
  const primary = useColor('accentPrimary');
  const secondary = useColor('accentSecondary');
  return (
    <group>
      <mesh position={[0, 0.42, 0]} castShadow>
        <coneGeometry args={[0.44, 0.85, 32]} />
        <meshStandardMaterial color={primary} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color={secondary} roughness={0.5} />
      </mesh>
    </group>
  );
};

const HoodAccessory: FC = () => {
  const primary = useColor('accentPrimary');
  return (
    <group position={[0, -0.15, 0]}>
      {/* Crown band hugging the top of the head */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.7, 0.16, 20, 40]} />
        <meshStandardMaterial color={primary} roughness={0.55} />
      </mesh>
      {/* Ears */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.42, 0.32, 0]} rotation={[0, 0, s * 0.25]} castShadow>
          <coneGeometry args={[0.16, 0.4, 24]} />
          <meshStandardMaterial color={primary} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
};

const FruitAccessory: FC = () => {
  const primary = useColor('accentPrimary');
  const secondary = useColor('accentSecondary');
  return (
    <group>
      <mesh position={[0, 0.28, 0]} scale={[1, 0.85, 1]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={primary} roughness={0.5} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2, 12]} />
        <meshStandardMaterial color={secondary} roughness={0.6} />
      </mesh>
      {/* Leaf */}
      <mesh position={[0.14, 0.66, 0]} rotation={[0, 0, -0.7]} scale={[1, 0.4, 0.2]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={secondary} roughness={0.6} />
      </mesh>
    </group>
  );
};

const HaloAccessory: FC = () => {
  const secondary = useColor('accentSecondary');
  return (
    <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.4, 0.06, 20, 40]} />
      <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.5} roughness={0.3} />
    </mesh>
  );
};

const WingsAccessory: FC = () => {
  const secondary = useColor('accentSecondary');
  return (
    <group>
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[s * 0.35, 0, -0.05]}
          rotation={[0, s * -0.4, s * 0.3]}
          scale={[0.25, 0.6, 0.9]}
          castShadow
        >
          <sphereGeometry args={[0.6, 24, 24]} />
          <meshStandardMaterial color={secondary} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

export const ACCESSORY_COMPONENTS: Record<AccessoryId, FC> = {
  hat: HatAccessory,
  hood: HoodAccessory,
  fruit: FruitAccessory,
  halo: HaloAccessory,
  wings: WingsAccessory,
};
