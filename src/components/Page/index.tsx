import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import { Box, Flex } from "@chakra-ui/react";

import {
	RiFolder2Line,
	RiKeyboardLine,
	RiSettings3Line,
	RiMoneyDollarCircleFill,
} from "react-icons/ri";
import { useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router-dom";

interface PageProps {
	children: JSX.Element;
	id?: string;
}

function Page({ children, id }: PageProps) {
	const { isAuthenticated } = useAuth();
	const history = useHistory();
	const sidebarGroups = [
		{
			title: "GERAL",
			subgroups: [
				{
					title: "Compras",
					icon: RiMoneyDollarCircleFill,
					page: "/compras",
				},
				{
					title: "Comprovantes",
					icon: RiFolder2Line,
				},
			],
		},
		{
			title: "CONFIGURAÇÕES",
			subgroups: [
				{
					title: "Atalhos",
					icon: RiKeyboardLine,
				},
				{
					title: "Parâmetros do sistema",
					icon: RiSettings3Line,
				},
			],
		},
	];

	useEffect(() => {
		if (!isAuthenticated) {
			history.push("/");
		}
	}, [isAuthenticated]);

	return (
		<Box id={id}>
			<Header />
			<Flex
				w="100%"
				my="6"
				maxWidth={1600}
				mx="auto"
				px="6"
				position="relative"
			>
				<Sidebar groups={sidebarGroups} />
				{children}
			</Flex>
		</Box>
	);
}

export default Page;
