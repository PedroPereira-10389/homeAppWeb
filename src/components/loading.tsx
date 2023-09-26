import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { SpinnerCircular } from 'spinners-react';
import styles from "../styles/custom.module.css";

export function LoadingPage({ elements }: { elements: number }) {
    return <Skeleton count={elements} />
}

export function Loading({ enabled }: { enabled: boolean }) {
    return (
        <>
            {enabled ? <div className={styles.overlay}>
                <SpinnerCircular enabled={enabled} size={80} color='#0d6efd'/>
            </div> : <div></div>}
        </>
    );
}
