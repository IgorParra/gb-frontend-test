import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Link,
	SimpleGrid,
	Stack,
	VStack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "components/FormComponents/Input";

import api from "services/api";

type AddNewPruchaseFormData = {
	code: number;
	value: number;
	buyed_at: number;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
};

const addNewPurchaseFormSchema = yup.object().shape({
	value: yup.number().required(" Valor é um campo obrigatório"),
	trading_name: yup.string().required("Razão social é um campo obrigatório"),
	buyed_at: yup.date().required("Data é um campo obrigatório"),
	cashback: yup.number().required("Cashback é um campo obrigatório"),
	status: yup
		.string()
		.oneOf(["Em validação", "Reprovado", "Aprovado"])
		.required("Status é um campo obrigatório"),
});

export const AddNewPurchase = () => {
	const HandleAddNewPurchase: SubmitHandler<AddNewPruchaseFormData> = async (
		data,
		event
	) => {
		// try {
		// 	await api.post("companies", { ...data, id }).then((response) => {
		// 		toast.success("Cliente adicionado com sucesso!", {
		// 			position: "top-right",
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			progress: undefined,
		// 		});
		// 	});
		// } catch (e) {
		// 	toast.error("Erro ao adicionar cliente", {
		// 		position: "top-right",
		// 		autoClose: 5000,
		// 		hideProgressBar: false,
		// 		closeOnClick: true,
		// 		pauseOnHover: true,
		// 		draggable: true,
		// 		progress: undefined,
		// 	});
		// }
	};

	const {
		register,
		handleSubmit,
		formState,
		control,
		setValue,
		getValues,
		reset,
	} = useForm({
		resolver: yupResolver(addNewPurchaseFormSchema),
	});

	const { errors } = formState;

	const formatZipCde = (value: string) => {
		const zipCode = value;
		if (zipCode) {
			if (zipCode.length === 8) {
				const newZipCode = `${zipCode.substr(0, 5)}-${zipCode.substr(5, 9)}`;
				return newZipCode;
			}
		}
		return value;
	};

	return (
		<Box
			flex="1"
			as="form"
			w="100%"
			position="relative"
			borderRadius={8}
			bg="transparent"
			p={["6", "8"]}
			onSubmit={handleSubmit(HandleAddNewPurchase)}
		>
			<Heading size="lg" fontWeight="normal">
				Criar usuário
			</Heading>

			<Divider my="6" borderColor="gray.700" />

			<VStack spacing="8">
				<Input
					maxLength={14}
					label="CNPJ - Apenas números"
					{...register("document")}
					error={errors.document}
				/>
				<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
					<Input
						label="Razão Social"
						{...register("company_name")}
						error={errors.company_name}
					/>
					<Input
						label="Nome fantasia"
						{...register("trading_name")}
						error={errors.trading_name}
					/>
				</SimpleGrid>
				<Box maxWidth="300px" w="100%" alignSelf="flex-start">
					<Input
						label="CEP"
						maxLength={8}
						{...register("zip_code")}
						error={errors.zip_code}
						onChange={(element) => {
							const newValue = formatZipCde(element.target.value);
							element.target.value = newValue;
							setValue("zip_code", newValue);
						}}
					/>
				</Box>
				<Stack width="100%" direction="row" justify="space-between">
					<Input
						label="Logradouro"
						{...register("public_place")}
						error={errors.public_place}
					/>

					<Input label="Número" {...register("number")} error={errors.number} />
				</Stack>
				<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
					<Input
						label="Complemento"
						{...register("complement")}
						error={errors.complement}
					/>
					<Input
						label="Bairro"
						{...register("district")}
						error={errors.district}
					/>
				</SimpleGrid>
				<Stack width="100%" direction="row" justify="space-between">
					<Input label="Cidade" {...register("city")} error={errors.city} />

					<Input label="UF" {...register("state")} error={errors.state} />
				</Stack>
			</VStack>

			<Flex mt="8" justify="flex-end">
				<HStack>
					<Link to="/clientes">
						<Button colorScheme="whiteAlpha">Cancelar</Button>
					</Link>
					<Button
						colorScheme="orange"
						type="submit"
						isLoading={formState.isSubmitting}
					>
						Próximo
					</Button>
				</HStack>
			</Flex>
		</Box>
	);
};
