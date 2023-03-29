
import React from "react"
import SearchBar from "."

import { render, screen, fireEvent, act } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';


const cityData = {
  _id: "6418c95d9bfeed85365c1d9b",
  id: 3464739,
  name: "Diadema",
  state: "",
  country: "BR"
}


jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        push: jest.fn()
      }
    }
  }

})

jest.mock('next/router')

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({data: [cityData]})),
}));


describe("search test", () => {

  it("should appear city name and country after enter input value", async() => {

    await act( async () => render(<SearchBar /> ));

    await waitFor(() => {
      fireEvent.change(screen.getByRole('combobox'), {target : {value: 'Diadema'}})
    });

    await waitFor(() => {
      expect(screen.getByText('Diadema, BR')).toBeInTheDocument()
    })
  })

  it("should redirect user to city page after insert the city name correctly", async() => {

    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    const router = { push: jest.fn() }
    useRouter.mockReturnValue(router)

    await act( async () => render(<SearchBar /> ));

    await waitFor(() => {
      fireEvent.change(screen.getByRole('combobox'), {target : {value: 'Diadema'}})
    });

    await waitFor(() => {
      fireEvent(
        screen.getByRole('option'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      )
    })

    await waitFor(() => {
      fireEvent.keyPress(screen.getByRole('combobox'), { key: 'Enter', keyCode: 13 });
      screen.getByRole('combobox').focus();
      userEvent.keyboard('{enter}');
    })
    expect(router.push).toHaveBeenCalledWith('/city/3464739')    


  })

  it("should not redirect the user if no value has entered and pressed enter", async() => {

    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    const router = { push: jest.fn() }
    useRouter.mockReturnValue(router)

    const {debug} = await act( async () => render(<SearchBar /> ));

    await waitFor(() => {
      fireEvent.change(screen.getByRole('combobox'), {target : {value: ''}})
    });

    await waitFor(() => {
      fireEvent.keyPress(screen.getByRole('combobox'), { key: 'Enter', keyCode: 13 });
      screen.getByRole('combobox').focus();
      userEvent.keyboard('{enter}');
    })
    
    expect(router.push).toBeCalledTimes(0);


  })

})


