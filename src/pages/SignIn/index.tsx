import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import { Input } from "components/FormComponents/Input";

import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import animationData from "assets/logo-animation.json";
import api from "services/api";
import { toast } from "react-toastify";
import { useAuth } from "hooks/useAuth";

type UserDataFormSchemaData = {
	email: string;
	password: string;
};

export const SignInPage = () => {
	const history = useHistory();
	const { signIn, isAuthenticated, user } = useAuth();
	const SignInDataFormSchema = yup.object().shape({
		email: yup.string().required("Nome é um campo obrigatório"),
		password: yup.string().required("Senha é um campo obrigatório"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SignInDataFormSchema),
	});
	const [animationState, setAnimationState] = useState({
		isStopped: false,
		isPaused: true,
	});
	const [isLoading, setIsLoading] = useState(false);

	const { isStopped, isPaused } = animationState;

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const HandleSignIn = async (data: any) => {
		setIsLoading(true);
		signIn(data).then(() => {
			setIsLoading(false);
		});
	};

	useEffect(() => {
		if (isAuthenticated) {
			history.push("/dashboard");
		}
		setAnimationState((prevState) => ({ ...prevState, isPaused: false }));
	}, [isAuthenticated]);

	return (
		<Flex w="100vw" h="100vh" align="center" justify="center" p={["0", "8"]}>
			<Stack
				as="form"
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
				onSubmit={handleSubmit(HandleSignIn)}
			>
				<Lottie
					key={"gb-logo"}
					options={defaultOptions}
					width={"100%"}
					isStopped={isStopped}
					isPaused={isPaused}
				/>
				<Stack spacing="6" flex="1">
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
						autoComplete="on"
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
						autoComplete="off"
						{...register("password")}
					/>

					<Stack spacing={3}>
						<Text fontSize="md" align="center">
							Não tem conta ainda?{" "}
							<Link to="/cadastro" style={{ color: "orange" }}>
								Criar conta
							</Link>
						</Text>
					</Stack>

					<Button
						type="submit"
						mt="6"
						colorScheme="orange"
						isLoading={isLoading}
						size="lg"
					>
						Entrar
					</Button>
				</Stack>
			</Stack>
		</Flex>
	);
};
