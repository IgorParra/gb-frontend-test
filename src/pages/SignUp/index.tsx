import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Box, Flex, Stack, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Input } from "components/FormComponents/Input";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt, BiUser, BiIdCard } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import animationData from "assets/logo-animation.json";
import api from "services/api";
import { toast } from "react-toastify";
import { useAuth } from "hooks/useAuth";

export const SignUpPage = () => {
	const { isAuthenticated } = useAuth();
	const SignUpDataFormSchema = yup.object().shape({
		name: yup.string().required("Nome é um campo obrigatório"),
		document: yup.string().required("CPF é um campo obrigatório"),
		email: yup.string().email().required("E-mail é um campo obrigatório"),
		password: yup.string().required("Senha é um campo obrigatório"),
	});

	const history = useHistory();

	const { handleSubmit, formState, register } = useForm({
		resolver: yupResolver(SignUpDataFormSchema),
	});
	const [animationState, setAnimationState] = useState({
		isStopped: false,
		isPaused: true,
	});
	const [activeMenu, setActiveMenu] = useState("signin");
	const [menuHeight, setMenuHeight] = useState("auto");

	const { errors } = formState;

	const { isStopped, isPaused } = animationState;

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
	};

	const HandleSignUp = async (data: any) => {
		try {
			await api.post("users", data).then((response) => {
				const {
					data: { errors },
					status,
				} = response;

				if (status === 201) {
					history.push("/");

					return toast.success("Conta criada com sucesso!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				}

				toast.error(
					`Erro ao criar conta:
				\n ${errors[0]}`,
					{
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					}
				);
			});
		} catch (e) {
			const error = e.response.data.errors[0];
			toast.error(
				`Erro ao criar conta:
			\n ${error}`,
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			history.push("/dashboard");
		}
		setAnimationState((prevState) => ({ ...prevState, isPaused: false }));
	}, []);

	return (
		<Flex w="100vw" h="100vh" align="center" justify="center" p={["0", "8"]}>
			<Stack
				as="form"
				onSubmit={handleSubmit(HandleSignUp)}
				spacing="8"
				w="100%"
				bg={["transparent", "gray.800"]}
				width="100%"
				maxWidth={360}
				flexDir="column"
				borderRadius="8"
				p="8"
				transition={"height ease 0.5s"}
				overflow="hidden"
				position="relative"
			>
				<Lottie
					key={"gb-logo"}
					options={defaultOptions}
					width={"100%"}
					isStopped={isStopped}
					isPaused={isPaused}
				/>

				<Box flexDir="column" borderRadius="8">
					<Stack spacing="6" flex="1">
						<Input
							color="gray.900"
							type="text"
							bgColor="white"
							label="Nome"
							error={errors.name}
							isRequired
							placeholder="Nome completo"
							icon={<BiUser />}
							{...register("name")}
							_focus={{ bgColor: "white", borderColor: "orange" }}
						/>
						<Input
							color="gray.900"
							type="number"
							bgColor="white"
							label="CPF"
							_hover={{ bgColor: "white" }}
							error={errors.document}
							isRequired
							icon={<BiIdCard />}
							placeholder="111.111.111-11"
							_focus={{ bgColor: "white", borderColor: "orange" }}
							{...register("document")}
						/>
						<Input
							color="gray.900"
							type="email"
							bgColor="white"
							label="E-mail"
							error={errors.email}
							isRequired
							placeholder="meu@email.com.br"
							_focus={{ bgColor: "white", borderColor: "orange" }}
							icon={<HiOutlineMail />}
							{...register("email")}
						/>

						<Input
							color="gray.900"
							type="password"
							bgColor="white"
							label="Senha"
							_hover={{ bgColor: "white" }}
							error={errors.password}
							isRequired
							icon={<BiLockAlt />}
							placeholder="senha"
							_focus={{ bgColor: "white", borderColor: "orange" }}
							{...register("password")}
						/>
						<Stack spacing={3}>
							<Text fontSize="md" align="center">
								Já tem conta?{" "}
								<Link to="/" style={{ color: "orange" }}>
									Faça login
								</Link>
							</Text>
						</Stack>
						<Button type="submit" mt="6" colorScheme="orange" size="lg">
							Criar conta
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};
