import { Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export function Logo() {
	return (
		<Box
			fontWeight="bold"
			letterSpacing="tight"
			w="60"
			cursor="pointer"
			_hover={{ textDecoration: "none" }}
		>
			<Link to="/dashboard">
				<Image
					style={{ width: "75px" }}
					src={require("assets/Logo_grupo_boticario_colorida.png").default}
				/>
			</Link>
		</Box>
	);
}
