import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input as ChakraInput,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputProps } from "types";

export const Input = ({
	name,
	label,
	error = undefined,
	type,
	icon,
	...rest
}: InputProps) => {
	const [show, setShow] = useState(false);

	const HandleChangeShowPasswordState = () => setShow(!show);
	return (
		<FormControl isInvalid={!!error}>
			{!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<InputGroup alignItems="center">
				{icon && (
					<InputLeftElement
						pointerEvents="none"
						color={"gray.200"}
						fontSize={"2xl"}
						children={icon}
						alignSelf="center"
						height="100%"
					/>
				)}
				<ChakraInput
					data-testid={`input-${name}`}
					name={name}
					id={name}
					type={type === "password" ? (show ? "text" : "password") : type}
					focusBorderColor="orange.400"
					bgColor="gray.900"
					variant="filled"
					_hover={{ opacity: "0.8" }}
					size="lg"
					_placeholder={{ color: "gray.200" }}
					{...rest}
				/>

				{type === "password" && (
					<InputRightElement width="3rem" height="100%">
						<Box
							as="button"
							type="button"
							p="1"
							color={"white"}
							borderRadius={"50%"}
							bgColor={"gray.100"}
							onClick={() => HandleChangeShowPasswordState()}
							_hover={{ background: "orange" }}
						>
							{show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</Box>
					</InputRightElement>
				)}
			</InputGroup>
			{!!error && (
				<FormErrorMessage data-testid={`input-error-${name}`}>
					{error.message}
				</FormErrorMessage>
			)}
		</FormControl>
	);
};
