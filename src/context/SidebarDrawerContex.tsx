import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import React, { createContext, useContext } from "react";
import { ReactNode } from "react";

interface SidebarDrawerContextProps {
	children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerContextProps) {
	const disclosure = useDisclosure();
	return (
		<SidebarDrawerContext.Provider value={disclosure}>
			{children}
		</SidebarDrawerContext.Provider>
	);
}

export const useSidbarDrawer = () => useContext(SidebarDrawerContext);
