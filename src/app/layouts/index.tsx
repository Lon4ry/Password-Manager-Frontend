import { geistMono, geistSans } from "../fonts";
import "../styles";
import { NextUIProvider } from "../providers";

export function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextUIProvider>{children}</NextUIProvider>
            </body>
        </html>
    );
}
