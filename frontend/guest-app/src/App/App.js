import React from "react";
import "./App.css";
import QuestionContainer from "../components/Question/QuestionContainer.js";
import TabPanel from "../components/Tab/TabPanel.js";
import NavBar from "../components/NavBar/NavBar.js";
import TabBar from "../components/Tab/TabBar.js";
import {
	LeftSideNavMenu,
	useLeftMenuBarState,
} from "../components/NavBar/LeftNavMenuBar.js";
import useTabBarState from "../components/Tab/TabBarState.js";
import useModalState from "../components/useModalState.js";

export default function App() {
	const navBarState = useLeftMenuBarState();
	const tabBarState = useTabBarState();
	const editProfileModalState = useModalState();
	const myQuestionModalState = useModalState();
	const logoutModalState = useModalState();

	return (
		<div>
			<NavBar onToggleNavClick={navBarState.toggleNavMenu} />

			<TabBar
				{...{
					tabIdx: tabBarState.tabIdx,
					onTabIdxChange: tabBarState.selectTabIdx,
				}}
			/>
			<TabPanel value={tabBarState.tabIdx} index={0}>
				<QuestionContainer />
			</TabPanel>
			<TabPanel value={tabBarState.tabIdx} index={1}>
				<div>vote me</div>
			</TabPanel>

			<LeftSideNavMenu
				isOpen={navBarState.isOpen}
				toggleNavMenu={navBarState.toggleNavMenu}
				onEditProfileClick={editProfileModalState.openModal}
				onMyQuestionClick={myQuestionModalState.openModal}
				onLogoutClick={logoutModalState.openModal}
			/>
		</div>
	);
}
