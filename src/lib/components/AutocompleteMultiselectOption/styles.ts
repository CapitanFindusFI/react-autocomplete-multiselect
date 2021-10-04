import styled from "styled-components";

type ItemStyleProps = {
  isSelected: boolean;
  isDisabled: boolean;
};

export const Item = styled.li<ItemStyleProps>`
  width: 100%;
  display: block;
  background-color: ${(props) => (props.isSelected ? "blue" : "transparent")};
  padding: 1rem;
  cursor: ${(props) =>
    props.isSelected
      ? "pointer"
      : props.isDisabled
      ? "not-allowed"
      : "pointer"};
  & + & {
    margin-top: 0.5rem;
  }
`;
