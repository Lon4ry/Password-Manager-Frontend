"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TogglePasswordVisibility } from "./TogglePasswordVisibility";

const schema = z.object({
    email: z.string().min(1, "Слишком короткая почта"),
    password: z.string().min(1, "Слишком короткий пароль"),
});

type Schema = z.infer<typeof schema>;

export function LoginPage() {
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
            <title>Войти | PasswordBook</title>
            <form className="flex w-[425px] flex-col items-center gap-12 rounded-xl border border-gray-700 p-5 pt-10 shadow shadow-gray-800">
                <h1 className="text-lg font-bold">Войти</h1>
                <div className="flex w-full flex-col gap-5">
                    <Input
                        label="Почта"
                        type="email"
                        placeholder=""
                        labelPlacement="outside"
                        errorMessage={errors.email?.message as string}
                        isInvalid={!!errors.email?.message}
                        {...register("email")}
                    />
                    <Input
                        label="Пароль"
                        type={isVisiblePassword ? "text" : "password"}
                        placeholder=""
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
                </div>
                <div className="flex w-full flex-col gap-2.5">
                    <Button type="submit" color="primary">
                        Войти
                    </Button>
                    <Button as={Link} href="/auth/register" type="button">
                        Регистрация
                    </Button>
                </div>
            </form>
        </main>
    );
}
