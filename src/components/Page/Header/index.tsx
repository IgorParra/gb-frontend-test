import {
	Flex,
	Icon,
	IconButton,
	useBreakpoint,
	useBreakpointValue,
} from "@chakra-ui/react";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { Searchbar } from "./Searchbar";
import { Logo } from "./Logo";
import { useSidbarDrawer } from "context/SidebarDrawerContex";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
	const { onOpen } = useSidbarDrawer();
	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true,
	});
	return (
		<Flex
			as="header"
			w="100%"
			maxWidth={1600}
			h="20"
			mx="auto"
			mt="4"
			px="6"
			align="center"
			justify={isWideVersion ? "center" : "space-between"}
		>
			{!isWideVersion && (
				<IconButton
					aria-label="Open navigation"
					fontSize="24"
					variant="unstyled"
					onClick={onOpen}
					mr="2"
					icon={<Icon as={RiMenuLine}></Icon>}
				/>
			)}
			<Logo />
			{isWideVersion && <Searchbar placeholder="Faça sua busca" />}

			<Flex align="center" ml="auto">
				<NotificationsNav />
				<Profile showProfileData={isWideVersion} />
			</Flex>
		</Flex>
	);
}
