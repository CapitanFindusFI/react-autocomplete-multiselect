import styled from "styled-components";

export const ClearInput = styled.a`
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 50%;
  margin-top: -0.5rem;
  right: 1rem;
  cursor: pointer;
  text-decoration: none;
`;

export const InputElement = styled.input`
  background: transparent;
  border: 0;
  height: 100%;
  padding: 0.5rem 2rem;
  outline: none;
  width: 100%;
`;

type ContainerStyleProps = {
  isFocused: boolean;
};

export const InputContainer = styled.div<ContainerStyleProps>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0 2rem;
  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 100%;
    height: 2px;
    transition: width 300ms ease-in;
    background-color: #ccc;
    width: ${(props) => (props.isFocused ? "50%" : "calc(50% - 4rem)")};
  }
  &:after {
    left: 50%;
  }
  &:before {
    right: 50%;
  }
`;
