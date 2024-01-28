'use client'

import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, LoadingOverlay, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Register({ searchParams }) {
    const [overlayLoading, setOverlay] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter()
    const { data: session, status } = useSession()

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
        },
        validate: {
            name: (value) => (value.length < 2 ? 'name is too short' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
            phone: (value) => value.match("(?:\\+88|88)?(01[3-9]\\d{8}$)") ? null : "Invalid Phone Number",
            password: (value) => (value.length < 5 ? 'Password length should be atleast 5' : null),
        },
    });

    const handleSubmit = async (values) => {
        setOverlay(true)
        let loadingPromise = toast.loading("Loading...")
        try {

            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const data = await res.json()
            // console.log(data);
            if (!res.ok) {
                toast.error(data?.error || "Some error arised", { id: loadingPromise })
            } else {
                toast.success(data?.message || "Succesful!", { id: loadingPromise, duration: 8000 })
                router.push('/signin')
            }
        } catch (error) {
            toast.error(error?.message || "Some error arised", { id: loadingPromise })
        }
        setOverlay(false)
    }

    useEffect(() => {
        setLoading(true)
        if (status === "unauthenticated") {
            setLoading(false)
        }
        else if (status === "authenticated") {
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
            <div className="flex flex-col items-center justify-center mx-auto mt-8">
                <div className="w-full md:bg-light rounded-lg md:shadow darks:border md:mt-0 sm:max-w-md xl:p-0">
                    <LoadingOverlay visible={overlayLoading} overlayProps={{ blur: 2 }} loader={<></>} />
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                label="Name"
                                placeholder='Enter your Name'
                                withAsterisk
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                label="Email"
                                placeholder='Enter your Email'
                                withAsterisk
                                {...form.getInputProps('email')}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder='Enter your Password'
                                withAsterisk
                                {...form.getInputProps('password')}
                            />
                            <TextInput
                                label="Phone"
                                placeholder='Enter your Phone Number'
                                withAsterisk
                                {...form.getInputProps('phone')}
                            />
                            <Button
                                fullWidth
                                type='submit'
                                className='w-full rounded-md !bg-blue-500'
                            >
                                Sing up
                            </Button>
                            <div className="text-center text-sm font-light text-gray-500 darks:text-gray-400">
                                Already have an account?
                                <Link href='/signin' className="font-medium text-primary-600 md:hover:underline darks:text-primary-500 underline">Sign in</Link>
                            </div>
                        </form>
                        {/* </Box> */}
                    </div>
                </div>
            </div>
        </section>
    );
}