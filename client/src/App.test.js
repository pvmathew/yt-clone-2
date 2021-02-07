/**
 * @jest-environment jsdom
 */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Routes } from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { cleanup, screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "./AppContext";
import fetchMock from "jest-fetch-mock";
import { sendLoginRequest } from "./api/auth";
// import { json } from "msw/lib/types/context";
 
// const fakeResponse = { success: true, message: "Successfully authenticated" };
// const server = setupServer(
//   rest.post("/auth/login", (req, res, ctx) => {
//     return res(ctx.json(fakeResponse));
//   })
// );

beforeEach(function () {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        ok: true,
        success: true,
        message: "Successfully authenticated",
        json: function () {
          return { success: true, message: "Successfully authenticated" };
        },
      });
    });

    return p;
  });
});

// beforeAll(() => server.listen());
// beforeEach(() => fetch.resetMocks());
afterEach(() => cleanup);
// afterAll(() => server.close());

// jest.mock("./api/auth", () => {
//   sendLoginRequest: jest
//     .fn()
//     .mockImplementation(() => ({
//       success: true,
//       message: "Successfully authenticated",
//     }));
// });

const renderPage = (route) => {
  const utils = render(
    <Provider>
      <MemoryRouter initialEntries={[route]}>
        <Routes />
      </MemoryRouter>
    </Provider>
  );
  const container = utils.container;
  return { container };
};

it("redirects to home on successful login", async () => {
  // const fakeUserResponse = {
  //   success: true,
  //   message: "Successfully authenticated",
  // };
  // jest.spyOn(fetch, "POST").mockImplementationOnce(() => {
  //   return Promise.resolve({
  //     json: () => Promise.resolve(JSON.stringify(fakeUserResponse)),
  //   });
  // });
  // fetch = jest
  //   .fn()
  //   .mockImplementation({ json: () => JSON.stringify(fakeUserResponse) });

  const { container } = renderPage("/login");
  // instantly proceeds any and all timers
  jest.useFakeTimers();
  const usernameField = screen.getByPlaceholderText("E-mail address");
  expect(usernameField).toBeInTheDocument();
  const passwordField = screen.getByPlaceholderText("Password");
  expect(passwordField).toBeInTheDocument();
  userEvent.type(usernameField, "pervin@gmail.com");
  userEvent.type(passwordField, "pervin123");
  expect(usernameField).toHaveValue("pervin@gmail.com");
  expect(passwordField).toHaveValue("pervin123");
  userEvent.click(screen.getByTestId(/login-button/i));
  const HomeText = await screen.findByText("Home");
  expect(HomeText).toBeInTheDocument();
  // await waitFor(() => {
  //   expect(screen.getByText("Home")).toBeInTheDocument();
  // });
  // global.fetch.mockClear();
});

// mock timer example

// function timerGame(callback) {
//   console.log("Ready....go!");
//   setTimeout(() => {
//     console.log("Time's up -- stop!");
//     callback && callback();
//   }, 10000);
// }

// test("waits 1 second before ending the game", () => {
//   jest.useFakeTimers();

//   timerGame();

//   expect(setTimeout).toHaveBeenCalledTimes(1);
//   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
// });

// it("fails to login with invalid credentials", async () => {
// const { container } = renderPage("/login");
// server.use(
//   rest.post("/api/login", (req, res, ctx) => {
//     return res(ctx.json({ success: false }));
//   })
// );
// screen.getByTestId(/login-button/i).click();
// waitFor(() => {
//   expect(container).toHaveTextContent(/Invalid/i);
// });
// });
