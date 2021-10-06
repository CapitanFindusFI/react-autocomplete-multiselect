import React from "react";
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

const onConfirm = (items: any[]) => {
  console.log("Selected items", items);
};

const App: React.FC = () => {
  return (
    <AppWrapper>
      <AppContent>
        <AutocompleteMultiselect
          searchFunction={searchFunction}
          onItemSelected={onItemSelected}
          onValidSelection={onConfirm}
          selectionMin={2}
          selectionMax={2}
        />
      </AppContent>
    </AppWrapper>
  );
};

export default App;
