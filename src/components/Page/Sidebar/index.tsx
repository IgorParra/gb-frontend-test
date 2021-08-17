import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useSidbarDrawer } from "context/SidebarDrawerContex";
import { ElementType } from "react";
import { SidebarNav } from "./SidebarNav";

import { CgLogOut } from "react-icons/cg";
import { useAuth } from "hooks/useAuth";
import { SidebarProps } from "types";

export function Sidebar({ groups }: SidebarProps) {
	const { signOut } = useAuth();
	const { isOpen, onClose } = useSidbarDrawer();
	const isDrawerSidebar = useBreakpointValue({
		base: true,
		lg: false,
	});

	if (isDrawerSidebar) {
		return (
			<Drawer isOpen={isOpen} placement="left" onClose={onClose}>
				<DrawerOverlay>
					<DrawerContent h="100%" bg="gray.800" p="4">
						<DrawerCloseButton mt="¨6" />
						<DrawerHeader>Menu</DrawerHeader>
						<DrawerBody display="flex" flexDirection="column">
							<SidebarNav groups={groups} />
							<Button
								leftIcon={<CgLogOut />}
								colorScheme="pink"
								variant="solid"
								w="100%"
								mt={"auto"}
								onClick={signOut}
							>
								Sair
							</Button>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		);
	}
	return (
		<Box
			as="aside"
			w="55"
			mr="8"
			display="flex"
			height="100%"
			flexDirection="column"
		>
			<SidebarNav groups={groups} />
			<Button
				leftIcon={<CgLogOut />}
				colorScheme="pink"
				variant="solid"
				w="100%"
				mt={5}
				onClick={signOut}
			>
				Sair
			</Button>
		</Box>
	);
}
