import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationProps } from "types";

import { PaginationButton } from "./PaginationButton";

const siblingsCount = 1;

const generatePagesArray = (from: number, to: number) => {
	return [...new Array(to - from)]
		.map((_, index) => {
			return from + index + 1;
		})
		.filter((page) => page > 0);
};

export const Pagination = ({
	totalCountOfRegisters = 0,
	registerPerPage = 10,
	currentPage = 10,
	onPageChange,
}: PaginationProps) => {
	const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

	const previousPage =
		currentPage > 1
			? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
			: [];

	const nextPages =
		currentPage < lastPage
			? generatePagesArray(
					currentPage,
					Math.min(currentPage + siblingsCount, lastPage)
			  )
			: [];

	return (
		<Stack
			direction={["column", "row"]}
			mt="8"
			justify="space-between"
			align="center"
			spacing="6"
		>
			<Box>
				<strong>{currentPage}</strong> - <strong>{lastPage}</strong> de{" "}
				<strong>{totalCountOfRegisters}</strong>
			</Box>

			<Stack direction="row" spacing="2">
				{currentPage > 1 + siblingsCount && (
					<>
						<PaginationButton onPageChange={onPageChange} pageNumber={1} />
						{currentPage > 2 + siblingsCount && (
							<Text
								color="gray.300"
								size="sm"
								width="8"
								textAlign="center"
								mt="auto"
							>
								...
							</Text>
						)}
					</>
				)}

				{previousPage.length > 0 &&
					previousPage.map((page) => (
						<PaginationButton
							onPageChange={onPageChange}
							pageNumber={page}
							key={page}
						/>
					))}

				<PaginationButton
					onPageChange={onPageChange}
					pageNumber={currentPage}
					isCurrent
				/>

				{nextPages.length > 0 &&
					nextPages.map((page) => (
						<PaginationButton
							onPageChange={onPageChange}
							pageNumber={page}
							key={page}
						/>
					))}

				{currentPage + siblingsCount < lastPage && (
					<>
						{currentPage + 1 + siblingsCount < lastPage && (
							<Text
								color="gray.300"
								size="sm"
								width="8"
								textAlign="center"
								mt="auto"
							>
								...
							</Text>
						)}
						<PaginationButton
							onPageChange={onPageChange}
							pageNumber={lastPage}
						/>
					</>
				)}
			</Stack>
		</Stack>
	);
};
