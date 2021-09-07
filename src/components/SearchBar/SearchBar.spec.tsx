import React from "react"
import { SearchBar } from "."

import { useMemo, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import algoliasearch from 'algoliasearch/lite';


import { mocked } from 'ts-jest/utils';
import { render, screen, fireEvent, act } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'

// jest.mock('algoliasearch/lite');
// jest.mock('@algolia/autocomplete-core');
// jest.mock('@algolia/autocomplete-preset-algolia');

const searchClient = algoliasearch(
  'L4998G5UXB',
  'c1271a9298769d286887fbad97fa030d'
);

describe("search bar function", () => {


  it("renders city correctly", async() => {

    await act( async () => render(<SearchBar /> ));

    fireEvent.change(screen.getByRole('searchbox'), {target : {value: 'Diadema'}})

    fireEvent(
      screen.getByRole('searchbox'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    await waitFor(() => {

      expect(screen.getByText('Diadema')).toBeInTheDocument()
    })

  })



})