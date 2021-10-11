import React, { useState } from "react";
import styled from "styled-components";
import AutocompleteMultiselect from "./lib/components";
import mock from "../mock";

const AppWrapper = styled.main`
  padding: 1rem;
`;

const AppContent = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const itemKeyFunction = (item: any) => item.id;

const selectCounter = ({ selectedItems, onItemClick }) => {
  return (
    <div>
      <h2>{selectedItems.length} selected</h2>
      {selectedItems.map((item: any) => {
        const displayName = [item.first_name, item.last_name].join(" ");
        return (
          <h5 key={`${item.id}-selected`} onClick={() => onItemClick(item)}>
            {displayName}
          </h5>
        );
      })}
    </div>
  );
};

const renderItem = ({ item, selected, disabled }) => {
  const displayName = [item.first_name, item.last_name].join(" ");
  return (
    <h5
      style={{ backgroundColor: selected ? "gray" : "transparent" }}
    >{`${displayName} is selected: ${selected ? "true" : "false"}`}</h5>
  );
};

const searchFunction = (query: string) => {
  return new Promise<any[]>((resolve) => {
    let filtered = mock;
    if (query.length) {
      filtered = filtered.filter((item: any) => {
        return item.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
    resolve(filtered);
  });
};

const onItemSelected = (item: any) => {
  console.log("selected", item);
};

const selectInput = ({ onChange }) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.currentTarget.value);
  };
  return (
    <div>
      <h3>Custom input</h3>
      <input type="text" onChange={onInputChange} />
    </div>
  );
};

const App: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const onSelectionChange = ({ selectedItems, valid }) => setIsValid(valid);

  return (
    <AppWrapper>
      <AppContent>
        <button type="button" disabled={!isValid}>
          Selection {isValid ? "valid" : "invalid"}
        </button>
        <AutocompleteMultiselect
          searchFunction={searchFunction}
          itemKeyFunction={itemKeyFunction}
          onItemSelected={onItemSelected}
          customInput={selectInput}
          renderItem={renderItem}
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
