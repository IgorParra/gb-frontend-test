import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ActiveLink } from "components/ActiveLink";
import { NavLinksProps } from "types";

export function NavLink({ icon, title, href, ...rest }: NavLinksProps) {
	return (
		<ActiveLink to={href}>
			<ChakraLink display="flex" align="center" {...rest}>
				<Icon as={icon} fontSize="20" />
				<Text ml="4" fontWeight="medium">
					{title}
				</Text>
			</ChakraLink>
		</ActiveLink>
	);
}
