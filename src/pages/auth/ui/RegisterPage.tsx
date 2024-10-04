"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link } from "@nextui-org/react";
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
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
            <title>Регистрация | PasswordBook</title>
            <form className="flex w-[425px] flex-col items-center gap-12 rounded-xl border border-gray-700 p-5 pt-10 shadow shadow-gray-800">
                <h1 className="text-lg font-bold">Регистрация</h1>
                <div className="flex w-full flex-col gap-5">
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
                                onClick={() =>
                                    setIsVisiblePassword(!isVisiblePassword)
                                }
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
                </div>
                <div className="flex w-full flex-col gap-2.5">
                    <Button type="submit" color="primary">
                        Продолжить
                    </Button>
                    <Button as={Link} href="/auth/login" type="button">
                        Назад
                    </Button>
                </div>
            </form>
        </main>
    );
}
