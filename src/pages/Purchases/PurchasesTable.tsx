import {
	Box,
	Button,
	Icon,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { Pagination } from "components/Pagination";
import { PurchasesTableProps } from "types";

export const PurchasesTable = ({
	purchases,
	page,
	setPage,
	totalCountOfRegisters,
}: PurchasesTableProps) => {
	return (
		<>
			<Table colorScheme="whiteAlpha">
				<Thead>
					<Tr>
						<Th px="6" color="gray.300" width="3">
							CÓD.
						</Th>
						<Th px="6" color="gray.300" width="8">
							VALOR
						</Th>

						<Th px="6" color="gray.300" width="8">
							DATA DA COMPRA
						</Th>
						<Th px="6" color="gray.300" width="8">
							CASHBACK | %
						</Th>

						<Th px="6" color="gray.300" width="8">
							STATUS
						</Th>

						<Th color="gray.300" width="20px"></Th>
					</Tr>
				</Thead>
				<Tbody>
					{!!purchases &&
						purchases.map((purchase) => {
							return (
								<Tr key={purchase.code}>
									<Td px="6">
										<Box width="20">
											<Text fontWeight="bold"> {purchase.code}</Text>
										</Box>
									</Td>

									<Td px="6">
										<Box>
											<Text fontWeight="bold">{purchase.value}</Text>
										</Box>
									</Td>

									<Td px="6">
										<Box>
											<Text fontWeight="bold">{purchase.buyed_at}</Text>
										</Box>
									</Td>
									<Td px="6">
										<Box>
											<Text fontWeight="bold">{purchase.cashback}</Text>
											<Text
												fontWeight="sm"
												color="gray.300"
												fontSize="sm"
												pt="2"
											>
												{purchase.percentCashback}{" "}
											</Text>
										</Box>
									</Td>

									<Td px="6">
										<Box>
											<Text
												fontWeight="bold"
												color={
													purchase.status === "Aprovado"
														? "green.300"
														: purchase.status === "Em validação"
														? "yellow.200"
														: "red.400"
												}
											>
												{" "}
												{purchase.status}
											</Text>
										</Box>
									</Td>

									<Th color="gray.300" width="2" cursor="pointer">
										<Button
											as="a"
											fontSize="sm"
											colorScheme="blue"
											width="20px"
											onClick={() => alert("Funcionalidade indisponível ")}
										>
											<Icon as={RiPencilLine} />
										</Button>
									</Th>
								</Tr>
							);
						})}
				</Tbody>
			</Table>
			<Pagination
				totalCountOfRegisters={totalCountOfRegisters}
				currentPage={page}
				onPageChange={setPage}
			/>
		</>
	);
};
