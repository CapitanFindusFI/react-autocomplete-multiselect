import styled from "styled-components";

type ItemStyleProps = {
  isSelected: boolean;
  isDisabled: boolean;
};

export const Item = styled.li<ItemStyleProps>`
  width: 100%;
  display: block;
  background-color: transparent;
  cursor: ${(props) =>
    props.isSelected
      ? "pointer"
      : props.isDisabled
      ? "not-allowed"
      : "pointer"};
`;
