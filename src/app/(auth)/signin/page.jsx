'use client'

import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box, Divider, LoadingOverlay, PasswordInput, Loader } from '@mantine/core';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Login({ searchParams }) {
    const [overlayLoading, setOverlay] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter()
    const { data: session, status } = useSession()

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
            password: (value) => (value.length < 5 ? 'Password length should be atleast 5' : null),
        },
    });

    const handleSubmit = async (values) => {
        setOverlay(true)
        try {
            let loadingPromise = toast.loading("Loading...")

            const data = await signIn('credentials', { ...values, redirect: false })

            if (!data?.error && data?.ok) {
                toast.success("Login Successful", { id: loadingPromise })
                router.push(searchParams.callback)
            } else {
                toast.error(data?.error || "Some error arised", { id: loadingPromise })
            }
        } catch (error) {
            console.log(error)
        }
        setOverlay(false)
    }

    useEffect(() => {
        setLoading(true)
        if (status === "unauthenticated") {
            setLoading(false)
        }
        else if(status === "authenticated") {
            router.push(searchParams.callback || "/");
        }
    }, [status]);

    if (isLoading) return (
        <section className='container py-16 h-screen gap-3 flex justify-center items-center'>
        <AiOutlineLoading3Quarters size={28} className='animate-spin' />
            <p className='text-base'>Loading...</p>
        </section>
    )

    return (
        <section className="container">
            {/* {JSON.stringify(session, null, 2)} */}
            <div className="flex flex-col items-center justify-center mx-auto mt-8">
                <div className="w-full md:bg-light md:shadow rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                    <LoadingOverlay visible={overlayLoading} overlayProps={{ blur: 2 }} loader={<></>} />
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                label="Email"
                                placeholder='Enter your Email'
                                {...form.getInputProps('email')}
                                withAsterisk
                            />
                            <PasswordInput
                                label="Password"
                                placeholder='Enter your Password'
                                {...form.getInputProps('password')}
                                withAsterisk
                            />
                            <Button
                                fullWidth
                                type='submit'
                                className='w-full rounded-md !bg-blue-500'
                            >
                                Sing in
                            </Button>
                            <div>
                                <div className="text-center text-sm text-gray-500 gap-x-1 flex items-center justify-center">
                                    <p>Don’t have an account yet?</p>
                                    <Link href='/signup' className="font-medium text-primary-600 md:hover:underline underline text-blue-500">Sign up</Link>
                                </div>
                                <div className="flex items-center justify-center">
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-blue-500">Forgot password?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}