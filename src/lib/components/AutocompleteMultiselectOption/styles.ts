import styled from "styled-components";

export const Content = styled.span`
  padding: 0.5rem 1rem;
  display: block;
  width: 100%;
`;

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
  & + & {
    ${Content} {
      margin-top: 1rem;
    }
  }
`;
