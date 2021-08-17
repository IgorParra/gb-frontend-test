import 'react-toastify/dist/ReactToastify.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import { SidebarDrawerProvider } from 'context/SidebarDrawerContex'

import Routes from './routes'
import { initMirageServer } from './services/mirage'
import { theme } from './styles/theme'

if (process.env.NODE_ENV === "development") {
	initMirageServer();
}

const queryClient = new QueryClient();

export const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<SidebarDrawerProvider>
					<Routes />
					<ToastContainer />
				</SidebarDrawerProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ChakraProvider>
	);
};
