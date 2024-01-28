import { Loader } from '@mantine/core'
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function loading() {
    return (
        <section className='container py-16 h-screen gap-3 flex justify-center items-center'>
            <AiOutlineLoading3Quarters size={28} className='animate-spin' />
            <p className='text-base'>Loading...</p>
        </section>
    )
}
