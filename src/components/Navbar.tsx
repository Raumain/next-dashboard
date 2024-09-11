import { UserButton } from "@stackframe/stack";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="dark:border-white/[.145] bg-[#f9f9f9] dark:bg-[#121212] p-4 border-b border-black/[.08] border-solid w-full">
			<div className="flex justify-between items-center mx-auto max-w-6xl">
				<Link href="/" className="flex items-center gap-2">
					<span className="font-semibold text-lg">Dashboard</span>
				</Link>
				<div className="flex items-center gap-4">
					<UserButton />
				</div>
			</div>
		</nav>
	);
}
