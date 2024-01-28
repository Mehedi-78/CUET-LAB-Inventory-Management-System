'use client'

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { RxCross1, RxDashboard } from 'react-icons/rx'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { IoIosLogOut } from 'react-icons/io'
import { usePathname, useRouter } from 'next/navigation'
import { ActionIcon, Avatar, LoadingOverlay } from '@mantine/core'
import { signOut, useSession } from 'next-auth/react';
import { useUserContext } from '@/context/ContextProvider'

export default function Sidebar({ authUser }) {
    const { data: session, status } = useSession()
    const { dispatch, user } = useUserContext()
    const pathname = usePathname()
    const sidebarRef = useRef()

    function openSidebar() {
        document.querySelector('body')?.classList.add('active_sidebar')
    }

    function closeSidebar() {
        document.querySelector('body')?.classList.remove('active_sidebar')
    }

    useEffect(() => {
        document.documentElement.addEventListener('click', function (e) {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) closeSidebar()
        })
    })

    return (
        <>
            {/* <LoadingOverlay className='fixed top-0 h-screen w-full' visible={status == 'loading'} loaderProps={{ children:'' }} zIndex={1000} overlayProps={{ blur: 4 }} /> */}
            <div className='container mobile_top_nav border-b border-blight-1 sticky top-0 backdrop-blur-md z-10 md:hidden'>
                <div
                    onClick={openSidebar}
                    className='h-[40px] w-[40px] border flex justify-center items-center cursor-pointer border-gray-400 rounded-full text-black my-2'
                >
                    <AiOutlineMenuUnfold className='text-2xl' />
                </div>
            </div>
            <aside ref={sidebarRef} className='main_sidebar overflow-y-auto md:h-screen h-full flex flex-col bg-gray-200 border-r border-gray-300s min-w-[250px] p-4 md:sticky fixed top-0 bottom-0 md:left-0 left-[-100%] duration-300 transition-[.3s ease-linear left] z-[20]'>
                <div className='flex items-center space-x-2 justify-between mb-8'>
                    <Link onClick={closeSidebar} href='/' className="bg-black select-none rounded-sm px-3 py-2 text-2xl font-semibold text-white">LAB</Link>
                    <div
                        onClick={closeSidebar}
                        className='h-[40px] w-[40px] border flex justify-center items-center cursor-pointer border-gray-400 rounded-full text-black md:hidden'
                    >
                        <RxCross1 />
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                    <div className="sidebar-menu space-y-1">
                        {
                            MenuItems.map((item, i) => {
                                if ((item.name == 'Admin' || item.name == 'Request Management Index') && user?.role != 'admin') return
                                if (item.name == 'Demand Control Index' && user?.role != 'manager') return
                                return (
                                    <Link onClick={closeSidebar} key={i} href={item.link} className={`flex items-center text px-3 py-2 rounded-md space-x-3 transition-all 
                                    ${'/' + pathname.split('/')[1] == item.link ? 'bg-gray-700 text-white' : 'md:hover:bg-gray-300 text-black'}
                                `}>
                                        <span>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-between text-black items-center space-x-2'>
                        <Link onClick={closeSidebar} href='/' className={`flex flex-1 items-center rounded-md space-x-1 transition-all `}>
                            <Avatar
                                className='rounded-full border border-gray-300'
                                src={0 ? '' : "/images/avatar.png"}
                            />
                            <span className='text'>{user && user?.name}</span>
                        </Link>
                        <ActionIcon
                            variant='transparent'
                            className='text-xl'
                            color='#000'
                            onClick={() => signOut()}
                        >
                            <IoIosLogOut size={20} />
                        </ActionIcon>
                    </div>
                </div>
            </aside>
        </>
    )
}

const MenuItems = [
    {
        name: 'Dashboard',
        icon: <RxDashboard />,
        link: '/'
    },
    {
        name: 'Admin',
        icon: <RxDashboard />,
        link: '/admin'
    },
    {
        name: 'LAB Inventory',
        icon: <RxDashboard />,
        link: '/main-lab'
    },
    {
        name: 'Request Management Index',
        icon: <RxDashboard />,
        link: '/request-management-index'
    },
    {
        name: 'Demand Control Index',
        icon: <RxDashboard />,
        link: '/handle-demand'
    },
    {
        name: 'OS Lab',
        icon: <RxDashboard />,
        link: '/os-lab'
    },
    {
        name: 'Microprocessor Lab',
        icon: <RxDashboard />,
        link: '/microprocessor-lab'
    },
    {
        name: 'Computer Lab',
        icon: <RxDashboard />,
        link: '/computer-lab'
    },
]