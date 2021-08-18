import { ReactNode, ElementType } from "react";
import { FieldError } from "react-hook-form";
import {
	InputProps as ChakraInputProps,
	LinkProps as ChakraLinkProps,
	FlexProps,
} from "@chakra-ui/react";
import { LinkProps } from "react-router-dom";
import { UseDisclosureReturn } from "@chakra-ui/react";

export interface CardProps extends FlexProps {
	title: string;
	children: ReactNode;
}

export interface InputProps extends ChakraInputProps {
	name: string;
	label?: string;
	error?: FieldError;
	icon?: String | JSX.Element;
}

export interface ActiveLinkProps extends LinkProps {
	children: ReactNode;
	shoulMatchExactHref?: boolean;
}

export interface Group {
	title: string;
	subgroups: {
		title: string;
		icon: ElementType;
		page?: string;
	}[];
}

export interface SidebarProps {
	groups: Group[];
}

export interface AddNewPruchaseFormData {
	code: number;
	value: number;
	buyed_at: number;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
}

export interface PurchasesData {
	code: number;
	value: number;
	buyed_at: number;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
	percentCashback: string;
}

export interface FormatedPurchasesData {
	code: number;
	value: string;
	buyed_at: string;
	cashback: string;
	status: "Em validação" | "Reprovado" | "Aprovado";
	percentCashback: string;
}

export interface PurchasesTableProps {
	purchases: FormatedPurchasesData[] | undefined;
	page: number;
	setPage(page: number): void;
	totalCountOfRegisters?: number | undefined;
}

export interface UserDataFormSchemaData {
	email: string;
	password: string;
}

export interface ProfileProps {
	showProfileData?: boolean;
}

export interface NavLinksProps extends ChakraLinkProps {
	title: string;
	icon: ElementType;
	href: string;
}

export interface NavSectionProps {
	title: string;
	children: ReactNode;
}

export interface SidebarNavProps {
	groups: Group[];
}

export interface PageProps {
	children: JSX.Element;
	id?: string;
}

export interface PaginationProps {
	totalCountOfRegisters: number | undefined;
	registerPerPage?: number;
	currentPage?: number;
	onPageChange: (page: number) => void;
}

export interface SignInCredentials {
	email: string;
	password: string;
}

export interface User {
	name: string;
	email: string;
	permissions: string[];
	roles: string[];
}

export interface AuthContextData {
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
	isAuthenticated: boolean;
	user: User | undefined;
}

export interface AuthProviderProps {
	children: ReactNode;
}

export interface SidebarDrawerContextProps {
	children: ReactNode;
}

export type SidebarDrawerContextData = UseDisclosureReturn;

export interface GetUserReponse {
	totalCount: number;
	purchases: FormatedPurchasesData[];
}

export interface UserProps {
	name: string;
	document: number;
	email: string;
	password: string;
	created_at: string;
}

export interface PurchasesRouteProps {
	code: number;
	value: number;
	buyed_at: number;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
}
export type RefreshTokensStore = Map<string, string[]>;

export type DecodedToken = {
	sub: string;
};
