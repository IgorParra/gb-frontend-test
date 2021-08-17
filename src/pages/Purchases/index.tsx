import Page from 'components/Page'
import { Box, Button, Flex, Heading, Icon, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { formatPrice } from 'util/format'
import { Card } from 'components/Card'
import { AiOutlineReload } from 'react-icons/ai'
import { usePurchases } from 'hooks/usePurchases'

import { PurchasesTable } from './PurchasesTable'

interface PurchasesData {
	code: number;
	value: number;
	buyed_at: number;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
	percentCashback: string;
}

export const Purchases = () => {
	const [page, setPage] = useState(1);

	const { data, isLoading, error, isFetching, refetch } = usePurchases(page);

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

	useEffect(() => {}, []);
	return (
		<Page id="ClientsIndex">
			<Box w="100%" p="8" flex="1">
				<SimpleGrid
					minChildWidth="300px"
					spacing={["6", "8"]}
					w="100%"
					m="20px 0"
				>
					<Card title="Total cashback" bg="green.700" color="green.100">
						{formatPrice(amountOfCashback)}
					</Card>
					<Card
						title="Valor total aguardando validação"
						bg="yellow.500"
						color="yellow.100"
					>
						{formatPrice(amountOfCashbackWaitingValidation)}
					</Card>

					<Card title="Valor total recusado" bg="red.700" color="red.100">
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
						<Heading
							size="lg"
							fontWeight="bold"
							display="flex"
							align="center"
							justify="center"
						>
							Compras{" "}
							{isFetching && !isLoading && (
								<>
									<Spinner
										size="sm"
										color="gray.500"
										ml="4"
										alignSelf="center"
									/>
									<Text
										fontSize="sm"
										color="gray.500"
										ml="4"
										alignSelf="center"
									>
										Atualizando dados ...
									</Text>
								</>
							)}
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
					<Box
						size="md"
						m=" 10px 0"
						onClick={() => refetch()}
						cursor="pointer"
						_hover={{ color: "orange" }}
					>
						<AiOutlineReload />
					</Box>
					{isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center">Falha ao obter a lista de compras</Flex>
					) : (
						<PurchasesTable
							purchases={data?.purchases}
							page={page}
							totalCountOfRegisters={data?.totalCount}
							setPage={setPage}
						/>
					)}
				</Box>
			</Box>
		</Page>
	);
};
