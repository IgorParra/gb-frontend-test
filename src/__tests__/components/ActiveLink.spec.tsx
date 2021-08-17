import React from "react";
import { cleanup, render } from "@testing-library/react";
import { ActiveLink } from "components/ActiveLink";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

jest.mock("hooks/useRouter", () => {
	return {
		useRouter() {
			return { pathname: "/" };
		},
	};
});

describe("Header component", () => {
	it("active link renders correctly", () => {
		const { queryByText } = render(
			<Router>
				<ActiveLink to="/">Home</ActiveLink>
			</Router>
		);

		expect(queryByText(/Home/)).toBeInTheDocument();
	});
});
