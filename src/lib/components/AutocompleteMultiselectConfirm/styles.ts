import styled from "styled-components";

type ConfirmStyleProps = {
  isDisabled: boolean;
};

export const Confirm = styled.button<ConfirmStyleProps>`
  display: block;
  border-radius: 3px;
  text-align: center;
  padding: 0.5rem 1rem;
  width: 100%;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
`;
