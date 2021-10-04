/// <reference types="cypress" />

import React from "react";
import { mount } from "@cypress/react";
import mock from "../mock";
import AutocompleteMultiselect from "./lib/components";

describe("multiselect", () => {
  const searchFunction = (query: string) =>
    new Promise<any[]>((resolve, reject) => {
      const filtered = mock.filter((el) => el.first_name.indexOf(query) > -1);
      resolve(filtered);
    });

  it("should render the select", () => {
    mount(<AutocompleteMultiselect searchFunction={searchFunction} />);
    cy.get<HTMLInputElement>('input').then(
      ($input: JQuery<HTMLInputElement>) => {
        $input.val("Wenda");
      }
    );

    cy.get<HTMLLIElement>("li").contains("Wenda");
  });
});
