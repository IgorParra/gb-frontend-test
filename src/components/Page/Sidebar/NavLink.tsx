import {
	Icon,
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
	Text,
} from "@chakra-ui/react";
import { ActiveLink } from "components/ActiveLink";
import { ElementType } from "react";

interface NavLinksProps extends ChakraLinkProps {
	title: string;
	icon: ElementType;
	href: string;
}

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
