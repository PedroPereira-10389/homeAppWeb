import { LoadingPage } from '@/components/loading'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] })

const DynamicContent = dynamic(() => import('./list'), {
    loading: () => <LoadingPage elements={1} />,
})

export default function Products() {
    return (
        <DynamicContent />
    )
}