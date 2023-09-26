import { LoadingPage } from "@/components/loading";
import { Suspense } from "react";
import { Inter } from 'next/font/google'
import HomeBody from "./home";



export default function Homepage() {
    return (
        <Suspense fallback={
            <LoadingPage elements={1} />}>
            <HomeBody></HomeBody>
        </Suspense>
    )
}