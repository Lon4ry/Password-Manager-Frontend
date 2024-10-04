"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TogglePasswordVisibility } from "./TogglePasswordVisibility";

const schema = z
    .object({
        email: z
            .string()
            .email("Это не похоже на почту 😟")
            .min(5, "Слишком короткая почта"),
        password: z
            .string()
            .min(12, "Слишком короткий пароль")
            .max(36, "Слишком длинный пароль"),
        confirm: z.string().min(1),
    })
    .refine(({ password, confirm }) => password === confirm, {
        message: "Пароли не совпадают",
        path: ["confirm"],
    });

type Schema = z.infer<typeof schema>;

export function RegisterPage() {
    const {
        register,
        formState: { errors },
    } = useForm<Schema>({
        mode: "onChange",
        delayError: 100,
        resolver: zodResolver(schema),
    });

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    return (
        <form
            id="form"
            className="m-20 flex max-w-sm flex-col items-center gap-5 rounded-lg border border-gray-700 px-5 py-10 shadow shadow-gray-800"
        >
            <Input
                label="Почта"
                type="email"
                placeholder="you@example.com"
                labelPlacement="outside"
                errorMessage={errors.email?.message as string}
                isInvalid={!!errors.email?.message}
                {...register("email")}
            />
            <Input
                label="Пароль"
                type={isVisiblePassword ? "text" : "password"}
                placeholder="123Example"
                labelPlacement="outside"
                errorMessage={errors.password?.message as string}
                isInvalid={!!errors.password?.message}
                {...register("password")}
                endContent={
                    <TogglePasswordVisibility
                        onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                        isVisible={isVisiblePassword}
                    />
                }
            />
            <Input
                label="Подтверждение пароля"
                type="password"
                placeholder="123Example"
                labelPlacement="outside"
                errorMessage={errors.confirm?.message as string}
                isInvalid={!!errors.confirm?.message}
                {...register("confirm")}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}
