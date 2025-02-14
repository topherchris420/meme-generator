import { PropsWithChildren, useState } from 'react';

import { useRandomInterval } from 'hooks/useRandomInterval';
import { random } from 'utils/random';
import { range } from 'utils/range';
import * as S from 'styles/components/Sparkles';

import { SparkleProps, SparklesProps } from './types';

const DEFAULT_COLOR = '#FFC700';

const generateSparkle = (color = DEFAULT_COLOR) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: `${random(0, 100)}%`,
      left: `${random(0, 100)}%`,
    },
  };

  return sparkle;
};

const Sparkle = ({ size, color, style }: SparkleProps) => {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';
  return (
    <S.SparkleWrapper style={style}>
      <S.SparkleSvg width={size} height={size} viewBox="0 0 68 68" fill="none">
        <path d={path} fill={color} />
      </S.SparkleSvg>
    </S.SparkleWrapper>
  );
};

export function Sparkles({
  children,
  ...delegated
}: PropsWithChildren<SparklesProps>) {
  const [sparkles, setSparkles] = useState(() =>
    range(3).map(() => generateSparkle()),
  );

  useRandomInterval({
    callback: () => {
      const sparkle = generateSparkle();
      const now = Date.now();
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });

      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },

    minDelay: 50,
    maxDelay: 450,
  });

  return (
    <S.Wrapper {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}

      <S.ChildWrapper>{children}</S.ChildWrapper>
    </S.Wrapper>
  );
}
