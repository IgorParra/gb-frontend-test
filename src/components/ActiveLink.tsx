import { useRouter } from "hooks/useRouter";
import React, { cloneElement, ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	shoulMatchExactHref?: boolean;
}

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
		<Link {...rest}>
			{cloneElement(children, { color: isActive ? "orange" : "gray.500" })}
		</Link>
	);
}
