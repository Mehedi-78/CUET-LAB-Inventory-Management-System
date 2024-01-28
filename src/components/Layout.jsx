'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { Loader } from '@mantine/core'
import { useUserContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Layout({ children }) {
    const { data: session, status } = useSession()
    const { dispatch, user } = useUserContext()
    const [isLoading, setLoading] = useState(true);
    const router = useRouter()

    const getNewUser = () => {
        if (status == 'authenticated') {
            fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/authUser`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(session?.user)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) dispatch({ type: 'ADD_USER', payload: data })
                    else signOut()
                })
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        setLoading(true)
        if (status === "unauthenticated") {
            router.push('/signin');
        }
        else if (status === "authenticated") {
            getNewUser()
        }
    }, [status]);

    if (isLoading || status == 'loading') return (
        <section className='container py-16 h-screen gap-3 flex justify-center items-center'>
            <AiOutlineLoading3Quarters size={28} className='animate-spin' />
            <p className='text-base'>Loading...</p>
        </section>
    )

    return (
        <>
            <main className="bg-light min-h-[100vh] flex md:flex-row flex-col md:gap-y-0 gap-y-4 w-full relative">
                <Sidebar session={session} />
                <div className="flex-1 max-w-full overflow-hidden">
                    {children}
                </div>
            </main>
        </>
    )
}
