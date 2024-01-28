'use client'

import { useUserContext } from "@/context/ContextProvider";
import { ActionIcon, Button, Menu, Modal, NumberInput, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function EventTable() {
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(true)
    const [refetchItems, setRefetchItems] = useState(0)
    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const { user } = useUserContext()
    const router = useRouter()

    const editRequestItems = (id, value) => {
        setIsLoading(true)
        fetch('https://lab-inventory.vercel.app/api/request/editAdminRequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id, status: value, supply: selectedItem?.supply || 0, available: selectedItem?.available - selectedItem?.supply })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setRefetchItems(e => e + 1)
            })
    }

    const getRequestItems = () => {
        setIsLoading(true)
        fetch('https://lab-inventory.vercel.app/api/request/getAdminRequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                // console.log(data)
                setItems(data)
            })
    }

    useEffect(() => {
        getRequestItems()
    }, [refetchItems])

    if (user?.role != 'admin') router.push('/')

    return (
        <>
            {/* {JSON.stringify(items,null,2)} */}
            {
                isLoading ?
                    <div className="flex justify-center items-center h-screen gap-4">
                        <AiOutlineLoading3Quarters size={30} className='animate-spin' />
                        <p className='text-xl'>Loading...</p>
                    </div> :
                    (
                        items?.length ?
                            <div className="space-y-8">
                                {
                                    items.filter(e => e.status == 'p').length ?
                                        <div className="">
                                            <div className="title">New Request</div>
                                            <div className="event_table overflow-x-auto max-w-fulls mx-auto rounded-md ">
                                                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                                                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                                                        <tr>
                                                            <th>SL NO.</th>
                                                            <th className="text-center">Name</th>
                                                            <th className="text-center">Description</th>
                                                            <th className="text-center">Amount</th>
                                                            <th className="text-center">Supply</th>
                                                            <th className="text-center">Request Type</th>
                                                            <th className="text-center">User</th>
                                                            <th className="text-center">Date</th>
                                                            <th className="text-center">Status</th>
                                                            {user?.role == 'admin' && <th>Action</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            items.filter(e => e.status == 'p').map((item, i) => (
                                                                <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                                                    <td>{i + 1}</td>
                                                                    <td className="text-center">{item.name}</td>
                                                                    <td className="text-center">{item.description}</td>
                                                                    <td className="text-center">{item.amount}</td>
                                                                    <td className="text-center">{item.supply}</td>
                                                                    <td className="text-center">{item.req_type}</td>
                                                                    <td className="text-center">
                                                                        <div className="flex flex-col gap-1">
                                                                            <span className="capitalize">{item.role}</span>
                                                                            {item.lab && <span className="">{`(${item.lab[0].toUpperCase()}${item.lab.slice(1)} Lab)`}</span>}
                                                                        </div>
                                                                    </td>
                                                                    <td className="min-w-[140px] flex flex-col items-center">
                                                                        <div>{moment(item.createdAt).format('ll')}</div>
                                                                        <div>{moment(item.createdAt).format('LT')}</div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <p className="chip p px-2">Pending</p>
                                                                    </td>
                                                                    {user?.role == 'admin' && <td className="text-center">
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
                                                                                    <Menu.Item
                                                                                        color="green"
                                                                                        onClick={() => {
                                                                                            setSelectedItem(item)
                                                                                            open()
                                                                                        }}
                                                                                    >
                                                                                        Accepted
                                                                                    </Menu.Item>
                                                                                    <Menu.Item
                                                                                        color="red"
                                                                                        onClick={() => editRequestItems(item._id, 'r')}
                                                                                    >
                                                                                        Rejected
                                                                                    </Menu.Item>
                                                                                </Menu.Dropdown>
                                                                            </Menu>
                                                                        </>
                                                                    </td>}
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> :
                                        <></>
                                }

                                {
                                    items.filter(e => e.status == 'a').length ?
                                        <div className="">
                                            <div className="title">Accepted Request</div>
                                            <div className="event_table overflow-x-auto max-w-fulls mx-auto rounded-md ">
                                                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                                                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                                                        <tr>
                                                            <th>SL NO.</th>
                                                            <th className="text-center">Name</th>
                                                            <th className="text-center">Description</th>
                                                            <th className="text-center">Amount</th>
                                                            <th className="text-center">Supply</th>
                                                            <th className="text-center">Request Type</th>
                                                            <th className="text-center">Name of Lab</th>
                                                            <th className="text-center">Date</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            items.filter(e => e.status == 'a').map((item, i) => (
                                                                <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                                                    <td>{i + 1}</td>
                                                                    <td className="text-center">{item.name}</td>
                                                                    <td className="text-center">{item.description}</td>
                                                                    <td className="text-center">{item.amount}</td>
                                                                    <td className="text-center">{item.supply}</td>
                                                                    <td className="text-center">{item.req_type}</td>
                                                                    <td className="text-center">
                                                                        <div className="flex flex-col gap-1">
                                                                            <span className="capitalize">{item.role}</span>
                                                                            {item.lab && <span className="">{`(${item.lab[0].toUpperCase()}${item.lab.slice(1)} Lab)`}</span>}
                                                                        </div>
                                                                    </td>
                                                                    <td className="min-w-[140px] flex flex-col items-center">
                                                                        <div>{moment(item.createdAt).format('ll')}</div>
                                                                        <div>{moment(item.createdAt).format('LT')}</div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <p className="chip a px-2">Accepted</p>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> :
                                        <></>
                                }

                                {
                                    items.filter(e => e.status == 'r').length ?
                                        <div className="">
                                            <div className="title">Rejected Request</div>
                                            <div className="event_table overflow-x-auto max-w-fulls mx-auto rounded-md ">
                                                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                                                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                                                        <tr>
                                                            <th>SL NO.</th>
                                                            <th className="text-center">Name</th>
                                                            <th className="text-center">Description</th>
                                                            <th className="text-center">Amount</th>
                                                            <th className="text-center">Supply</th>
                                                            <th className="text-center">Request Type</th>
                                                            <th className="text-center">Name of Lab</th>
                                                            <th className="text-center">Date</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            items.filter(e => e.status == 'r').map((item, i) => (
                                                                <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                                                    <td>{i + 1}</td>
                                                                    <td className="text-center">{item.name}</td>
                                                                    <td className="text-center">{item.description}</td>
                                                                    <td className="text-center">{item.amount}</td>
                                                                    <td className="text-center">{item.supply}</td>
                                                                    <td className="text-center">{item.req_type}</td>
                                                                    <td className="text-center">
                                                                        <div className="flex flex-col gap-1">
                                                                            <span className="capitalize">{item.role}</span>
                                                                            {item.lab && <span className="">{`(${item.lab[0].toUpperCase()}${item.lab.slice(1)} Lab)`}</span>}
                                                                        </div>
                                                                    </td>
                                                                    <td className="min-w-[140px] flex flex-col items-center">
                                                                        <div>{moment(item.createdAt).format('ll')}</div>
                                                                        <div>{moment(item.createdAt).format('LT')}</div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <p className="chip r px-2">Rejected</p>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> :
                                        <></>
                                }
                            </div> :
                            <div className="title flex justify-center items-center h-screen gap-4">No Request Found</div>
                    )
            }

            <Modal
                opened={opened}
                onClose={close}
                transitionProps={{ transition: 'fade', duration: 200 }}
                title={<div className="title mt-6">Supply Amount</div>}
            >
                <form className='space-y-4' onSubmit={(e) => {
                    e.preventDefault()
                    close()
                    // setSelectedItem(pre=>({...pre, available:pre.available-pre.supply}))
                    editRequestItems(selectedItem._id, 'a')
                }}>
                    <NumberInput
                        label="Available"
                        placeholder="Enter amount of avaiable item"
                        disabled
                        value={selectedItem?.available}
                    />
                    <NumberInput
                        min={0}
                        max={selectedItem.available}
                        label="Supply"
                        placeholder="Enter amount of supply item"
                        withAsterisk
                        required
                        value={selectedItem?.supply}
                        onChange={(e) => setSelectedItem(pre => ({ ...pre, supply: e }))}
                    />
                    <Button
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                </form>
            </Modal >
        </>
    );
}