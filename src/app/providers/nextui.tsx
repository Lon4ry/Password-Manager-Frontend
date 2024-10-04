"use client";

import { NextUIProvider as Provider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
    const navigate = useRouter();
    return (
        <Provider navigate={navigate.push} locale="ru-RU" disableRipple>
            {children}
        </Provider>
    );
}
