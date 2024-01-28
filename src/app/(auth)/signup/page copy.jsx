import { Button, PasswordInput, TextInput } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

export default async function SignUp() {
    
    return (
        <section className="container">
            <div className="flex flex-col items-center justify-center mx-auto mt-8">
                <div className="w-full md:bg-light rounded-lg md:shadow darks:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                        >
                            <TextInput
                                label="Name"
                                placeholder='Enter your Name'
                                // onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                // value={formik.values.email}
                                withAsterisk
                                // error={errors.email}
                            />
                            <TextInput
                                label="Email"
                                placeholder='Enter your Email'
                                // onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                // value={formik.values.email}
                                withAsterisk
                                // error={errors.email}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder='Enter your Password'
                                // onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                // value={formik.values.email}
                                withAsterisk
                                // error={errors.email}
                            />
                            <Button
                                fullWidth
                                component={Link}
                                href='/'
                                // type='submit'
                                className='w-full rounded-md !bg-blue-500'
                            >
                                Sing up
                            </Button>
                            <div className="text-center text-sm font-light text-gray-500 darks:text-gray-400">
                                Already have an account?
                                <Link href='/signin' className="font-medium text-primary-600 md:hover:underline darks:text-primary-500 underline">Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}