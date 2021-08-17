import { Stack } from "@chakra-ui/react";
import { SidebarNavProps } from "types";
import { NavLink } from "./NavLink";
import NavSection from "./NavSection";

export function SidebarNav({ groups }: SidebarNavProps) {
	const renderGroups = groups.map((group, key) => {
		const { title, subgroups } = group;
		return (
			<NavSection title={title} key={key}>
				{subgroups.map((subgroup, key) => {
					const { title, icon, page = "#" } = subgroup;
					return <NavLink key={key} title={title} icon={icon} href={page} />;
				})}
			</NavSection>
		);
	});
	return (
		<Stack spacing="12" align="flex-start">
			{renderGroups}
		</Stack>
	);
}
