import { render } from "@testing-library/react";
import { FieldError } from "react-hook-form";
import { Input } from "components/FormComponents/Input";
import { isTypeParameterDeclaration } from "typescript";

describe("ActiveLink component", () => {
	it("shoud render a input correctly", () => {
		const inputName = "name";
		const { queryByTestId } = render(<Input name={inputName} />);

		expect(queryByTestId(`input-${inputName}`)).toBeInTheDocument();
	});

	it("should show a error message if it exist", () => {
		const error: FieldError = { type: "value", message: "error" };
		const inputName = "name";

		const { queryByTestId } = render(<Input name={inputName} error={error} />);

		expect(queryByTestId(`input-error-${inputName}`)).toBeInTheDocument();
	});
});
