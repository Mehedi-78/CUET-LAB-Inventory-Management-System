'use client'

import React, { useEffect, useState } from 'react'
import BlurImage from './BlurImage'
import { AiFillEdit } from 'react-icons/ai'
import { Button } from '@mantine/core'
import { useUserContext } from '@/context/ContextProvider'

export default function Profile() {
    const { user } = useUserContext()
    console.log(user)

    return (
        <div className="bg-white p-4 rounded-md border border-blight-1">
            <div className="title">Profile</div>
            <div className="space-y-6">
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <BlurImage
                        className='w-[240px] aspect-square object-cover m-auto rounded-md'
                        src={user?.image} alt="Profle"
                    />
                    {/* <Button
                        leftSection={<AiFillEdit size={14} />} variant='filled' size="xs">
                        Edit
                    </Button> */}
                </div>
                <div className='ditals'>
                    <div className="user_details grid md:grid-cols-2 gap-4">
                        <div className="item flex flex-col">
                            <span className='text-sm text-gray-400'>Name</span>
                            <span className='font-medium dark:text-white'>{user.name}</span>
                        </div>
                        <div className="item flex flex-col">
                            <span className='text-sm text-gray-400'>Designation</span>
                            <span className='font-medium dark:text-white'>{user.role}</span>
                        </div>
                        <div className="item flex flex-col">
                            <span className='text-sm text-gray-400'>Email</span>
                            <span className='font-medium dark:text-white'>{user.email}</span>
                        </div>
                        <div className="item flex flex-col">
                            <span className='text-sm text-gray-400'>Phone</span>
                            <span className='font-medium dark:text-white'>{user.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
