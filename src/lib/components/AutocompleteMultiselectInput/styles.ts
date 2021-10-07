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
  padding: 0.5rem 0rem;
  outline: none;
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1rem;
`;
