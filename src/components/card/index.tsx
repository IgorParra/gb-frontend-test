import { Flex, Text, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { CardProps } from "types";

export const Card = ({ title, children, ...rest }: CardProps) => {
	return (
		<Flex borderRadius={8} bg="gray.800" flexDirection="column" p={5} {...rest}>
			<Text as="span" fontWeight="bold">
				{title}
			</Text>
			<Text as="span" mt={4}>
				{children}
			</Text>
		</Flex>
	);
};
