'use client'

import { useUserContext } from '@/context/ContextProvider'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

export default function RequestTable({ lab, role }) {
    const [items, setItems] = useState([])
    const { user } = useUserContext()

    const getRequestItems = () => {
        // setIsLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_CLIENT}/api/request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lab, role })
        })
            .then(res => res.json())
            .then(data => {
                // setIsLoading(false)
                // console.log(data)
                setItems(data)
            })
    }

    useEffect(() => {
        getRequestItems()
    }, [])
    console.log(user.role, role)
    if (user.role != role || (user.role == 'asistant' && user.lab != lab)) return <></>
    return (
        <>
            {
                items.length ?
                    <div className="">
                        <div className="title">Previous Request</div>
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
                                        items.map((item, i) => (
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
                                                <td>
                                                    <div className="min-w-[140px] flex flex-col items-center">
                                                        <div>{moment(item.createdAt).format('ll')}</div>
                                                        <div>{moment(item.createdAt).format('LT')}</div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    {
                                                        item.status == 'a' ? <p className="chip a px-2">Accepted</p> :
                                                            item.status == 'p' ? <p className="chip p px-2">Pending</p> :
                                                                <p className="chip r px-2">Rejected</p>
                                                    }

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
        </>
    )
}
