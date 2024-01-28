'use client'

import { useUserContext } from "@/context/ContextProvider";
import { ActionIcon, Menu } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function HandleNewUserRequest() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { refetchUserTable2, dispatch, user } = useUserContext()
    const router = useRouter()

    const getNewUser = () => {
        setIsLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getNewUser()
    }, [refetchUserTable2])


    if (user.role != 'admin') router.push('/')
    return (
        <>
            {
                isLoading ?
                    <div className='flex justify-center items-center p-4'>
                        <AiOutlineLoading3Quarters size={28} className='animate-spin' />
                    </div> :
                    (
                        users.length ?
                            <div className="space-y-2">
                                <div className="title">Users</div>
                                <div className="event_table overflow-x-auto max-w-fulls mx-auto rounded-md border border-blight-1">
                                    <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                                        <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                                            <tr>
                                                <th>SL NO.</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((item, i) => (
                                                    <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                                        <td>{i + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.role} {item.role == 'asistant' && `(${item?.lab})`}</td>
                                                        <td className="space-x-3 min-w-[110px]">
                                                            <>
                                                                <Menu width={200} shadow="md">
                                                                    <Menu.Target>
                                                                        <ActionIcon
                                                                            variant="transparent"
                                                                            size='sm'
                                                                            color="#000"
                                                                        >
                                                                            <HiOutlineDotsVertical size={16} />
                                                                        </ActionIcon>
                                                                    </Menu.Target>

                                                                    <Menu.Dropdown>
                                                                        {
                                                                            ['os', 'computer', 'microprocessor'].map((lab, i) => (
                                                                                <Menu.Item
                                                                                    key={i}
                                                                                    onClick={() => {
                                                                                        let loadingPromise = toast.loading("Loading...")
                                                                                        fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/user/roleLabAsistant`, {
                                                                                            method: 'POST',
                                                                                            headers: {
                                                                                                'Accept': 'application/json',
                                                                                                'Content-Type': 'application/json'
                                                                                            },
                                                                                            body: JSON.stringify({ _id: item._id, lab })
                                                                                        })
                                                                                            .then(res => res.json())
                                                                                            .then(data => {
                                                                                                if (data) {
                                                                                                    toast.success("Role set Successfully!", { id: loadingPromise })
                                                                                                    dispatch({ type: 'Recfetch_Table_2' })
                                                                                                } else {
                                                                                                    toast.error("Something is wrong!", { id: loadingPromise })
                                                                                                }
                                                                                            })
                                                                                    }}
                                                                                >
                                                                                    Lab Asistant ({lab})
                                                                                </Menu.Item>
                                                                            ))
                                                                        }
                                                                        <Menu.Item
                                                                            onClick={() => {
                                                                                let loadingPromise = toast.loading("Loading...")
                                                                                fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/user/roleLabManager`, {
                                                                                    method: 'POST',
                                                                                    headers: {
                                                                                        'Accept': 'application/json',
                                                                                        'Content-Type': 'application/json'
                                                                                    },
                                                                                    body: JSON.stringify({ _id: item._id })
                                                                                })
                                                                                    .then(res => res.json())
                                                                                    .then(data => {
                                                                                        if (data) {
                                                                                            toast.success("Role set Successfully!", { id: loadingPromise })
                                                                                            dispatch({ type: 'Recfetch_Table_2' })
                                                                                        } else {
                                                                                            toast.error("Something is wrong!", { id: loadingPromise })
                                                                                        }
                                                                                    })
                                                                            }}
                                                                        >
                                                                            Lab Manager
                                                                        </Menu.Item>
                                                                        <Menu.Divider />
                                                                        <Menu.Item
                                                                            color="red"
                                                                            onClick={() => {
                                                                                let loadingPromise = toast.loading("Loading...")
                                                                                fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/user/deleteUser`, {
                                                                                    method: 'POST',
                                                                                    headers: {
                                                                                        'Accept': 'application/json',
                                                                                        'Content-Type': 'application/json'
                                                                                    },
                                                                                    body: JSON.stringify(item._id)
                                                                                })
                                                                                    .then(res => {
                                                                                        res.json()
                                                                                        if (res.status == 200) {
                                                                                            setUsers(users.filter((val) => val._id !== item._id));
                                                                                            toast.success("Deleted Successfully!", { id: loadingPromise })
                                                                                        }
                                                                                        else {
                                                                                            toast.error("Something is wrong!", { id: loadingPromise })
                                                                                        }
                                                                                    })
                                                                            }}
                                                                        >
                                                                            Delete User
                                                                        </Menu.Item>
                                                                    </Menu.Dropdown>
                                                                </Menu>
                                                            </>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div >
                            : <></>
                    )
            }
        </>
    );
}


const lists = [
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
        role: 'Lab Manager',
    },
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
        role: 'Lab Asistant',
    },
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
        role: 'Lab Asistant',
    },
]
