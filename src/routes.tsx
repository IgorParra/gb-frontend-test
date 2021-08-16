import { BrowserRouter as Router, Route } from "react-router-dom";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { Purchases } from "./pages/Purchases";
import { CreateClient } from "./pages/Purchases/create";

import { Dashboard } from "pages/Dashboard";
import { AuthProvider } from "context/auth";

const Routes = () => {
	return (
		<Router>
			<AuthProvider>
				<Route component={SignInPage} path="/" exact />
				<Route component={SignUpPage} path="/cadastro" />
				<Route component={Dashboard} path="/dashboard" />
				<Route component={Purchases} path="/compras" exact />
				<Route component={CreateClient} path="/compras/cadastro" exact />
			</AuthProvider>
		</Router>
	);
};

export default Routes;
