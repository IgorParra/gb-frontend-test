import { Box, Flex, Text, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps extends FlexProps {
	title: string;
	children: ReactNode;
}

export const Card = ({ title, children, ...rest }: CardProps) => {
	return (
		<Flex borderRadius={8} bg="gray.800" flexDirection="column" p={5} {...rest}>
			<Text as="span">{title}</Text>
			<Text as="span" mt={4}>
				{children}
			</Text>
		</Flex>
	);
};
