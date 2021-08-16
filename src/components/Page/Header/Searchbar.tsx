import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function Searchbar({ placeholder }: { placeholder: string }) {
	return (
		<Flex
			as="label"
			flex="1"
			py="4"
			px="8"
			maxWidth={400}
			alignSelf="center"
			color="gray.200"
			bg="gray.800"
			borderRadius="full"
		>
			<Input
				color="gray.50"
				variant="unstyled"
				placeholder={placeholder}
				px="4"
				mr="4"
				_placeholder={{ color: "gray.400" }}
			/>

			<Icon as={RiSearchLine} fontSize="20" />
		</Flex>
	);
}
