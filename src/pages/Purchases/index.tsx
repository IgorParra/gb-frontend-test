import {
	Box,
	Flex,
	Heading,
	Button,
	Icon,
	Table,
	Thead,
	Tr,
	Checkbox,
	Th,
	Tbody,
	Td,
	Text,
	SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "components/Pagination";

import Page from "components/Page";
import { useEffect, useState } from "react";
import api from "services/api";
import { formatDate, formatPrice } from "util/format";
import { Card } from "components/card";

interface PurchasesData {
	code: number;
	value: number;
	buyed_at: number;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
}
export const Purchases = () => {
	const [purchases, setPurchases] = useState<PurchasesData[]>(
		[] as PurchasesData[]
	);

	const amountOfCashback = purchases.reduce(
		(accumulator, purchase) =>
			purchase.status === "Aprovado"
				? accumulator + purchase.value
				: accumulator,
		0
	);

	const amountOfCashbackWaitingValidation = purchases.reduce(
		(accumulator, purchase) =>
			purchase.status === "Em validação"
				? accumulator + purchase.value
				: accumulator,
		0
	);

	const amountOfCashbackDenied = purchases.reduce(
		(accumulator, purchase) =>
			purchase.status === "Reprovado"
				? accumulator + purchase.value
				: accumulator,
		0
	);

	useEffect(() => {
		console.log("oi");
		api.get("purchases").then((response) => {
			setPurchases(response.data.purchases);
		});
	}, []);
	return (
		<Page id="ClientsIndex">
			<Box w="100%" p="8" flex="1">
				<SimpleGrid
					minChildWidth="300px"
					spacing={["6", "8"]}
					w="100%"
					m="20px 0"
				>
					<Card title="Total cashback" bg="green.100" color="green.800">
						{formatPrice(amountOfCashback)}
					</Card>
					<Card
						title="Valor total aguardando validação"
						bg="yellow.100"
						color="yellow.800"
					>
						{formatPrice(amountOfCashbackWaitingValidation)}
					</Card>

					<Card title="Valor total recusado" bg="red.100" color="red.800">
						{formatPrice(amountOfCashbackDenied)}
					</Card>
				</SimpleGrid>

				<Box
					flex="1"
					borderRadius={8}
					bg="gray.800"
					p="8"
					overflowX="auto"
					css={{
						"&::-webkit-scrollbar": {
							width: "4px",
							borderRadius: "8px",
						},
						"&::-webkit-scrollbar-track": {
							background: "#353646",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "orange",
							borderRadius: "8px",
						},
					}}
				>
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="bold">
							Compras
						</Heading>
						<Link to="/compras/cadastro">
							<Button
								as="a"
								size="md"
								colorScheme="orange"
								leftIcon={<Icon as={RiAddLine} />}
							>
								Nova compra
							</Button>
						</Link>
					</Flex>
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
							{purchases.map((purchase) => {
								return (
									<Tr key={purchase.code}>
										<Td px="6">
											<Box width="20">
												<Text fontWeight="bold"> {purchase.code}</Text>
											</Box>
										</Td>

										<Td px="6">
											<Box>
												<Text fontWeight="bold">
													{formatPrice(purchase.value)}
												</Text>
											</Box>
										</Td>

										<Td px="6">
											<Box>
												<Text fontWeight="bold">
													{formatDate(purchase.buyed_at)}
												</Text>
											</Box>
										</Td>
										<Td px="6">
											<Box>
												<Text fontWeight="bold">
													{formatPrice(purchase.cashback)}
												</Text>
												<Text
													fontWeight="sm"
													color="gray.300"
													fontSize="sm"
													pt="2"
												>
													{((purchase.cashback * 100) / purchase.value).toFixed(
														2
													)}
													%
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
					<Pagination />
				</Box>
			</Box>
		</Page>
	);
};
