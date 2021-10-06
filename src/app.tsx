import React, { useState } from "react";
import styled from "styled-components";
import AutocompleteMultiselect from "./lib/components";

const AppWrapper = styled.main`
  padding: 1rem;
`;

const AppContent = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const selectItems = [
  { name: "foo", value: "foo" },
  { name: "bar", value: "bar" },
  { name: "baz", value: "baz" },
  { name: "zab", value: "zab" },
  { name: "asd", value: "asd" },
];

const itemKeyFunction = (item: any) => {
  return item.value;
};

const selectCounter = (selectedItems: any[]) =>
  !selectedItems.length ? null : <span>{selectedItems.length} selected</span>;

const searchFunction = (query: string) => {
  return new Promise<any[]>((resolve) => {
    let filtered = selectItems;
    if (query.length) {
      filtered = selectItems.filter((item: any) => {
        return item.name.indexOf(query) > -1;
      });
    }
    resolve(filtered);
  });
};

const onItemSelected = (item: any) => {
  console.log("selected", item);
};

const App: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const onSelectionChange = (items: any[], valid: boolean) => {
    setIsValid(valid);
    console.log(`Are selected items valid? ${valid}`, items);
  };

  return (
    <AppWrapper>
      <AppContent>
        <button type="button" disabled={!isValid}>
          Selection {isValid ? "valid" : "invalid"}
        </button>
        <AutocompleteMultiselect
          searchFunction={searchFunction}
          onItemSelected={onItemSelected}
          onSelectionChange={onSelectionChange}
          customCounter={selectCounter}
          selectionMin={2}
          selectionMax={3}
        />
      </AppContent>
    </AppWrapper>
  );
};

export default App;
