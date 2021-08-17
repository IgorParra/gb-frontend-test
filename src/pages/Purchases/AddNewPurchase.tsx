import * as yup from "yup";
import api from "services/api";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/FormComponents/Input";
import { useMutation } from "react-query";
import { useState } from "react";
import { queryClient } from "services/queryClient";

const addNewPurchaseFormSchema = yup.object().shape({
	code: yup.number().required("Código é um campo necessario"),
	value: yup.number().required(" Valor é um campo obrigatório"),
	buyed_at: yup.date().required("Data é um campo obrigatório"),
});

export const AddNewPurchase = () => {
	const addPurchase = useMutation(
		async (data: any) => {
			const date = new Date(data.buyed_at);
			const timestamp = date.getTime();

			const response = await api.post("purchases", {
				...data,
				buyed_at: timestamp,
			});

			return response.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("purchases");
			},
		}
	);
	const history = useHistory();
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(addNewPurchaseFormSchema),
	});

	const [isLoading, setIsLoading] = useState(false);
	const onSubmit = async (data: any) => {
		setIsLoading(true);
		try {
			await addPurchase.mutateAsync(data).then(() => {
				history.push(`/compras`);
				toast.success("Compra cadastrada!", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
		} catch (e) {
			toast.error(`Erro ao adicionar cliente:${e.response.data[0]}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		setIsLoading(false);
	};

	const { errors } = formState;

	return (
		<Box
			flex="1"
			as="form"
			w="100%"
			position="relative"
			borderRadius={8}
			bg="transparent"
			p={["6", "8"]}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Heading size="lg" fontWeight="normal">
				Cadastrar compra
			</Heading>

			<Divider my="6" borderColor="gray.700" />

			<VStack spacing="8">
				<Input
					maxLength={14}
					label="Código"
					{...register("code")}
					error={errors.code}
				/>
				<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
					<Input
						label="Valor"
						type="number"
						step=".01"
						{...register("value")}
						error={errors.value}
					/>
					<Input
						label="Data da Compra"
						type="date"
						{...register("buyed_at")}
						error={errors.buyed_at}
					/>
				</SimpleGrid>
			</VStack>
			<Flex mt="8" justify="flex-end">
				<HStack>
					<Link to="/compras">
						<Button colorScheme="whiteAlpha">Cancelar</Button>
					</Link>
					<Button colorScheme="orange" type="submit" isLoading={isLoading}>
						Cadastrar
					</Button>
				</HStack>
			</Flex>
		</Box>
	);
};
