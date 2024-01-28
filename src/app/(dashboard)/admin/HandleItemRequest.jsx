'use client'

import { Menu, Select } from "@mantine/core";
import { useState } from "react";

export default function HandleItemRequest() {
    const [eventLists, setEventLists] = useState(lists)

    const handleEvent = (value, item) => {
        setEventLists((prev) => prev.map(l =>
            l._id == item._id
                ? { ...l, status: value }
                : l
        ))
    }

    return (
        <div className="space-y-2">
            <div className="title">Item's Request</div>
            <div className="event_table overflow-x-auto max-w-fulls mx-auto rounded-md border border-blight-1">
                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                        <tr>
                            <th>SL NO.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Demand</th>
                            <th>Supply</th>
                            <th>Request Type</th>
                            <th>Name of Lab</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eventLists.map((item, i) => (
                                <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.supply}</td>
                                    <td>{item.type}</td>
                                    <td>{item.lab}</td>
                                    <td>{item.date}</td>
                                    <td className="min-w-[155px]">
                                        <Select
                                            variant="n"
                                            rightSection={<div className="hidden w-0" />}
                                            data={
                                                [
                                                    { label: 'Accepted', value: 'a' },
                                                    { label: 'Rejected', value: 'r' },
                                                    { label: 'Pending', value: 'p' },
                                                ]
                                            }
                                            onChange={(v) => handleEvent(v, item)}
                                            defaultValue={item.status}
                                            className={`chip ${item.status}`}
                                        />

                                        {/* <p className={`chip ${item.status}`}>
                                            {
                                                item.status == 'a' ?
                                                    'Accepted' :
                                                    item.status == 'p' ?
                                                        'Pending' :
                                                        'Rejected'
                                            }
                                        </p> */}
                                        {/* <>
                                            <Menu width={200} shadow="md">
                                                <Menu.Target>
                                                    <p className={`chip ${item.status}`}>
                                                        {
                                                            item.status == 'a' ?
                                                                'Accepted' :
                                                                item.status == 'p' ?
                                                                    'Pending' :
                                                                    'Rejected'
                                                        }
                                                    </p>
                                                </Menu.Target>

                                                <Menu.Dropdown>
                                                    <Menu.Divider />
                                                    <Menu.Item
                                                        color="blue"
                                                        onClick={() => {
                                                            // openActionModal()
                                                            // setSelectedItem({ ...item, title: "Edit", id: 3 })
                                                        }}
                                                    >
                                                        Edit Item
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        color="red"
                                                        onClick={() => {
                                                            alert("Item delted!")
                                                        }}
                                                    >
                                                        Delete Item
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </> */}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}


const lists = [
    {
        _id: 1,
        name: 'PC',
        description: 'This is a very long text that describes the item.',
        amount: 5,
        supply: 5,
        status: 'a',
        type: 'Repair',
        lab: 'OS Lab',
        date: '23/12/2023, 15:20:32',
    },
    {
        _id: 2,
        name: 'UPS',
        description: 'This is a very long text that describes the item.',
        amount: 6,
        supply: 6,
        status: 'r',
        lab: 'OS Lab',
        type: 'Restock',
        date: '23/12/2023, 15:20:32',
    },
    {
        _id: 3,
        name: 'Monitor',
        description: 'This is a very long text that describes the item.',
        amount: 3,
        supply: 3,
        status: 'p',
        type: 'Purchase',
        lab: 'OS Lab',
        date: '23/12/2023, 15:20:32',
    },
]
