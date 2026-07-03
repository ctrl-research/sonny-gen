import { useColor } from './useColor';

// Anchor points (in the figure group's local space) that accessories attach to. Kept here
// so the figure geometry and accessory placement stay consistent.
export const HEAD_ANCHOR: [number, number, number] = [0, 2.28, 0];
export const BACK_ANCHOR: [number, number, number] = [0, 0.7, -0.85];

/**
 * Original, procedurally-generated Sonny Angel–style figure: a chubby body, a large round
 * head with a minimal face, blush cheeks, and stubby limbs. Built from primitives so each
 * mesh can be tinted by a colour group.
 */
export function Figure() {
  const body = useColor('body');
  const blush = useColor('blush');
  const eyes = useColor('eyes');

  return (
    <group name="figure-base">
      {/* Body */}
      <mesh position={[0, 0.55, 0]} castShadow scale={[1, 1.05, 1]}>
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshStandardMaterial color={body} roughness={0.6} metalness={0} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.78, 48, 48]} />
        <meshStandardMaterial color={body} roughness={0.6} metalness={0} />
      </mesh>

      {/* Eyes */}
      {[-0.28, 0.28].map((x) => (
        <mesh key={x} position={[x, 1.58, 0.68]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color={eyes} roughness={0.35} />
        </mesh>
      ))}

      {/* Blush cheeks */}
      {[-0.46, 0.46].map((x) => (
        <mesh key={x} position={[x, 1.4, 0.6]} scale={[1, 0.7, 0.4]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial color={blush} roughness={0.7} />
        </mesh>
      ))}

      {/* Arms */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.82, 0.62, 0]} rotation={[0, 0, s * 0.5]} castShadow>
          <capsuleGeometry args={[0.19, 0.34, 12, 24]} />
          <meshStandardMaterial color={body} roughness={0.6} />
        </mesh>
      ))}

      {/* Legs */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.34, -0.2, 0.05]} castShadow>
          <capsuleGeometry args={[0.22, 0.16, 12, 24]} />
          <meshStandardMaterial color={body} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
