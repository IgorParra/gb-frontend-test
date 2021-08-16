import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Stack,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useSidbarDrawer } from "context/SidebarDrawerContex";
import { ElementType } from "react";
import { NavLink } from "./NavLink";
import NavSection from "./NavSection";
import { SidebarNav } from "./SidebarNav";

import { CgLogOut } from "react-icons/cg";
import { useAuth } from "hooks/useAuth";

interface group {
	title: string;
	subgroups: {
		title: string;
		icon: ElementType;
	}[];
}

interface SidebarProps {
	groups: group[];
}

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
					<DrawerContent bg="gray.800" p="4">
						<DrawerCloseButton mt="¨6" />
						<DrawerHeader>Menu</DrawerHeader>
						<DrawerBody>
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
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		);
	}
	return (
		<Box as="aside" w="55" mr="8">
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
