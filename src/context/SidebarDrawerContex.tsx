import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext } from "react";
import { SidebarDrawerContextData, SidebarDrawerContextProps } from "types";

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
