import Login from "../components/login";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("Login component tests", () => {

    test("should display ADP in title", () => {
        render(<Login />);
        const linkElement = screen.getByText(/adp/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("should disable button", async () => {
        const user = userEvent.setup();
        render(<Login />);
        let select = screen.getByRole("combobox") as HTMLSelectElement;
        expect(select.options.length).toEqual(3);
        let option = screen.getByRole("option", { name: "French" }) as HTMLOptionElement;
        expect(+option.value).toEqual(2);
        let button = screen.getByRole("button", { name: /Log In/i }) as HTMLButtonElement;
        expect(button.disabled).toEqual(true);
        let login = screen.getByTestId("login") as HTMLInputElement;
        await waitFor(() => user.type(login, "stevens"));
        let password = screen.getByAltText("password") as HTMLInputElement;
        await waitFor(() => user.type(password, "sesame"));
        expect(password.value).toEqual("sesame");
        expect(button.disabled).toBeFalsy();
    });

});
