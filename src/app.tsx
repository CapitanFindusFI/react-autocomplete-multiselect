import React from "react";
import styled from "styled-components";
import AutocompleteMultiselect from "./lib/components/AutocompleteMultiselectSelect";

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
];

const itemKeyFunction = (item: any) => {
  return item.value;
};

const searchFunction = (query: string) => {
  return new Promise<any[]>((resolve, reject) => {
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
  return (
    <AppWrapper>
      <AppContent>
        <AutocompleteMultiselect
          searchFunction={searchFunction}
          onItemSelected={onItemSelected}
        />
      </AppContent>
    </AppWrapper>
  );
};

export default App;
