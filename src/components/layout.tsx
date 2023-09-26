import { useEffect, useState } from "react";
import NavbarComponent from "./menu";
import { useRouter } from "next/router";
import Provider from "./provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }: any) => {
    return (
        <>
            <NavbarComponent />
            <main className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}>{children}</main>
        </>
    )
}

export default Layout;

