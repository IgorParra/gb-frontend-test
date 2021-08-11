import { BrowserRouter as Router, Route } from "react-router-dom";
import { Index } from "./pages";

const Routes = () => {
	return (
		<Router>
			<Route component={Index} path="/" exact />
		</Router>
	);
};

export default Routes;
