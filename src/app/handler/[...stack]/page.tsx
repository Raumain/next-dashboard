import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
import type { PropsWithChildren } from "react";

export default function Handler(props: PropsWithChildren<unknown>) {
	return <StackHandler fullPage app={stackServerApp} {...props} />;
}
