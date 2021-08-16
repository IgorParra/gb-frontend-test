import { useState } from "react";
import { Box } from "@chakra-ui/react";

import Page from "components/Page";
import { AddNewPurchase } from "./AddNewPurchase";

export function CreateClient() {
	return (
		<Page>
			<Box
				w="100%"
				overflow="hidden"
				position="relative"
				borderRadius={8}
				bg="gray.800"
				flex="1"
			>
				<Box as="div" className="form" w="100%">
					<AddNewPurchase />
				</Box>
			</Box>
		</Page>
	);
}
