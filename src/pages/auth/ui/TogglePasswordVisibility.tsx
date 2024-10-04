"use client";

import { EyeOff, Eye } from "lucide-react";

export function TogglePasswordVisibility({
    onClick,
    isVisible,
}: {
    onClick: () => void;
    isVisible: boolean;
}) {
    return (
        <button
            className="focus:outline-none"
            type="button"
            onClick={onClick}
            aria-label="toggle password visibility"
        >
            {isVisible ? (
                <EyeOff className="pointer-events-none text-2xl text-default-400" />
            ) : (
                <Eye className="pointer-events-none text-2xl text-default-400" />
            )}
        </button>
    );
}
