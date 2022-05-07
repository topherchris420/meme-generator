import { PropsWithChildren } from 'react';
import { PulseLoader } from 'react-spinners';

import { handleClick } from 'components/RippleButton';
import * as S from 'styles/components/Base/Button';

import { ButtonProps } from './types';

export function Button({
  children,
  loading,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <S.Button id="ripple-button" onClick={handleClick} {...rest}>
      {loading ? (
        <PulseLoader color="var(--loader-color)" size={10} />
      ) : (
        children
      )}
    </S.Button>
  );
}
