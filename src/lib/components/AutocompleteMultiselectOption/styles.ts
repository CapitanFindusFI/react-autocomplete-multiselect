import styled from "styled-components";

type ItemStyleProps = {
  isSelected: boolean;
};

export const Item = styled.div<ItemStyleProps>`
  background-color: ${(props) => (props.isSelected ? "blue" : "transparent")};
  padding: 1rem;
  cursor: pointer;
  & + & {
    margin-top: 0.5rem;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
`;
