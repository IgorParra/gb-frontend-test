import { useRouter } from "hooks/useRouter";
import { Link } from "react-router-dom";
import { ActiveLinkProps } from "types";

export function ActiveLink({
	children,
	shoulMatchExactHref = false,
	...rest
}: ActiveLinkProps) {
	const { pathname } = useRouter();

	let isActive = false;

	if (shoulMatchExactHref && pathname === rest.to) {
		isActive = true;
	}

	if (!shoulMatchExactHref && pathname.startsWith(String(rest.to))) {
		isActive = true;
	}
	return (
		<Link {...rest} style={{ color: isActive ? "orange" : "gray.500" }}>
			{children}
		</Link>
	);
}
