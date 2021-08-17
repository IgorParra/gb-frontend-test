import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { initMirageServer } from "./services/mirage";
import { theme } from "./styles/theme";

import "react-toastify/dist/ReactToastify.css";
import { SidebarDrawerProvider } from "context/SidebarDrawerContex";

if (process.env.NODE_ENV === "development") {
	initMirageServer();
}

export const App = () => {
	return (
		<ChakraProvider theme={theme}>
			{" "}
			<SidebarDrawerProvider>
				<Routes />
				<ToastContainer />
			</SidebarDrawerProvider>
		</ChakraProvider>
	);
};
