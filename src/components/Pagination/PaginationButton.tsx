import { Button } from "@chakra-ui/react";

interface PaginationButtonProps {
	isCurrent?: boolean;
	pageNumber: number;
	onPageChange(page: number): void;
}

export function PaginationButton({
	isCurrent = false,
	pageNumber,
	onPageChange,
}: PaginationButtonProps) {
	if (isCurrent) {
		return (
			<Button
				size="sm"
				fontSize="xs"
				width="4"
				colorScheme="pink"
				disabled
				_disabled={{ bgColor: "orange", cursor: "default" }}
			>
				{pageNumber}
			</Button>
		);
	}

	return (
		<Button
			size="sm"
			fontSize="xs"
			width="4"
			bg="gray.700"
			_hover={{ bg: "gray.500" }}
			onClick={() => onPageChange(pageNumber)}
		>
			{pageNumber}
		</Button>
	);
}
