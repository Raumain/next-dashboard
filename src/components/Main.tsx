"use client";

import {
	type Dispatch,
	type SetStateAction,
	useState,
	type PropsWithChildren,
} from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
	LayoutDashboard,
	FolderKanban,
	Users,
	User,
	ChevronLeft,
	ChevronRight,
	Sun,
	Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "@stackframe/stack";

const Main = (props: PropsWithChildren) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className="flex bg-gray-100 dark:bg-gray-900 w-full h-screen">
			<Sidebar collapsedHandler={{ collapsed, setCollapsed }} />

			<motion.main
				initial="expanded"
				animate={collapsed ? "collapsed" : "expanded"}
				variants={{
					expanded: { marginLeft: "16rem" },
					collapsed: { marginLeft: "4.3rem" },
				}}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="flex flex-col flex-1 justify-center items-center p-4 border border-red-300 w-full h-screen overflow-x-hidden overflow-y-auto"
			>
				{props.children}
			</motion.main>
		</div>
	);
};

export default Main;

const Sidebar = ({
	collapsedHandler,
}: {
	collapsedHandler: {
		collapsed: boolean;
		setCollapsed: Dispatch<SetStateAction<boolean>>;
	};
}) => {
	const { collapsed, setCollapsed } = collapsedHandler;
	const toggleSidebar = () => setCollapsed(!collapsed);

	const { theme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	const navItems = [
		{ name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
		{ name: "Projects", icon: FolderKanban, href: "/projects" },
		{ name: "Team", icon: Users, href: "/teams" },
	];

	const sidebarVariants = {
		expanded: { width: "16rem" },
		collapsed: { width: "4.3rem" },
	};

	const textVariants = {
		collapsed: { opacity: 0, width: 0 },
		expanded: { opacity: 1, width: "auto" },
	};
	return (
		<motion.aside
			initial="expanded"
			animate={collapsed ? "collapsed" : "expanded"}
			variants={sidebarVariants}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="fixed flex flex-col justify-between border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 border-r h-full text-gray-700 dark:text-gray-200 overflow-hidden"
		>
			<div>
				<div className="flex justify-between items-center px-4 h-16">
					<div className="flex justify-center items-center w-8 h-8">
						<AnimatePresence mode="wait">
							{!collapsed && (
								<motion.span
									variants={textVariants}
									initial="collapsed"
									animate="expanded"
									exit="collapsed"
									transition={{ duration: 0.2, delay: 0.1 }}
									className="font-semibold text-xl whitespace-nowrap"
								>
									Logo
								</motion.span>
							)}
						</AnimatePresence>
					</div>
					<button
						type="button"
						onClick={toggleSidebar}
						className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700 p-1.5 rounded-lg"
					>
						{collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
					</button>
				</div>

				<nav className="mt-8 px-2">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 mb-2 px-4 py-2 rounded-lg h-10"
						>
							<div className="flex justify-center items-center">
								<item.icon size={20} className="flex-shrink-0" />
							</div>
							<AnimatePresence mode="wait">
								{!collapsed && (
									<motion.span
										variants={textVariants}
										initial="collapsed"
										animate="expanded"
										exit="collapsed"
										transition={{ duration: 0.2, delay: 0.1 }}
										className="ml-4 whitespace-nowrap"
									>
										{item.name}
									</motion.span>
								)}
							</AnimatePresence>
						</Link>
					))}
				</nav>
			</div>

			<div className="mb-8 px-2">
				<Link
					href="/handler/account-settings"
					className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg h-10"
				>
					<div className="flex justify-center items-center w-5 h-5">
						<UserButton />
					</div>
					<AnimatePresence mode="wait">
						{!collapsed && (
							<motion.span
								variants={textVariants}
								initial="collapsed"
								animate="expanded"
								exit="collapsed"
								transition={{ duration: 0.2, delay: 0.1 }}
								className="ml-4 whitespace-nowrap"
							>
								Account
							</motion.span>
						)}
					</AnimatePresence>
				</Link>
				<button
					type="button"
					onClick={toggleTheme}
					className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 mt-4 px-4 py-2 rounded-lg w-full h-10"
				>
					<div className="flex justify-center items-center w-5 h-5">
						{theme === "dark" ? (
							<Sun size={20} className="flex-shrink-0" />
						) : (
							<Moon size={20} className="flex-shrink-0" />
						)}
					</div>
					<AnimatePresence mode="wait">
						{!collapsed && (
							<motion.span
								variants={textVariants}
								initial="collapsed"
								animate="expanded"
								exit="collapsed"
								transition={{ duration: 0.2, delay: 0.1 }}
								className="ml-4 whitespace-nowrap"
							>
								{theme === "dark" ? "Light Mode" : "Dark Mode"}
							</motion.span>
						)}
					</AnimatePresence>
				</button>
			</div>
		</motion.aside>
	);
};
