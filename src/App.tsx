import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { initMirageServer } from "./services/mirage";
import { theme } from "./styles/theme";

if (process.env.NODE_ENV === "development") {
	initMirageServer();
}

export const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Routes />
		</ChakraProvider>
	);
};
