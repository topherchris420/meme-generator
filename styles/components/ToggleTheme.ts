import styled from 'styled-components';

export const Button = styled.button`
  background: transparent;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
`;
