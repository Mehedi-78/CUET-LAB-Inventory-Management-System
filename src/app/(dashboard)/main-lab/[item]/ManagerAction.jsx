'use client'

import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Autocomplete, Button, LoadingOverlay, Menu, Modal, NumberInput, TextInput } from "@mantine/core";
import { useUserContext } from "@/context/ContextProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ManagerAction({ item, setItem }) {
    const [overlayLoading, setOverlay] = useState(false);
    const [openedActionModal, { open: openActionModal, close: closeActionModal }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState(item)
    const { user } = useUserContext()
    const router = useRouter()


    const handleDelete = () => {
        setOverlay(true)
        let loadingPromise = toast.loading("Loading...")
        fetch('https://lab-inventory.vercel.app/api/item/delete', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item._id)
        })
            .then(res => res.json())
            .then(data => {
                setOverlay(false)
                if (data) {
                    setItem(data)
                    toast.success("Succesfully Delted!", { id: loadingPromise })
                    router.push('/main-lab')
                } else {
                    toast.error(data || "Some error arised", { id: loadingPromise })
                }
            })

    }

    const ActionModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged, amount: undefined })

        const handleChange = (value, name) => {
            // console.log({value, name})
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            setOverlay(true)
            let loadingPromise = toast.loading("Loading...")
            e.preventDefault()
            let itemObj = {
                ...formValue,
                itemId: item._id,
                req_type: selectedItem?.id == 1 ? 'restock' : selectedItem?.id == 2 ? 'repair' : 'demand',
                role: 'manager',
                lab: null,
            }
            // alert(JSON.stringify(itemObj, null, 2))
            fetch('https://lab-inventory.vercel.app/api/request/addRequest', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(itemObj)
            })
                .then(res => res.json())
                .then(data => {
                    setOverlay(false)
                    // console.log(data)
                    if (data) {
                        toast.success("Succesfully sent request!", { id: loadingPromise })
                        setFormValue({ name: '', description: '', available: '', damaged: '', amount: null })
                        closeActionModal()
                    } else {
                        toast.error(data || "Some error arised", { id: loadingPromise })
                    }
                })
        }

        const handleEdit = (e) => {
            setOverlay(true)
            let loadingPromise = toast.loading("Loading...")
            e.preventDefault()
            const { amount, ...i } = formValue
            let itemObj = {
                ...i,
                _id: item._id,
                role: user?.role,
                // lab: user?.lab,
            }
            // alert(JSON.stringify(itemObj, null,2))
            fetch('https://lab-inventory.vercel.app/api/item/edit', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(itemObj)
            })
                .then(res => res.json())
                .then(data => {
                    setOverlay(false)
                    // console.log(data)
                    if (data) {
                        setItem(data)
                        toast.success("Succesfully Edited!", { id: loadingPromise })
                        setFormValue({ name: '', description: '', available: '', damaged: '', amount: null })
                        closeActionModal()
                    } else {
                        toast.error(data || "Some error arised", { id: loadingPromise })
                    }
                })

        }

        return (
            <Modal opened={openedActionModal} onClose={closeActionModal} title={<div className="title mt-6">{selectedItem.title}</div>}>

                <form
                    className="space-y-4"
                    onSubmit={selectedItem.id ? handleSubmit : handleEdit}
                >
                    <TextInput
                        label="Name"
                        readOnly
                        value={formValue.name}
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        placeholder='Enter description of item'
                        onChange={(e) => handleChange(e.target.value, 'description')}
                        value={formValue.description}
                    />
                    <NumberInput
                        min={0}
                        label="Available"
                        name="available"
                        placeholder='Amount of available item'
                        onChange={(e) => handleChange(e, 'available')}
                        withAsterisk
                        required
                        value={formValue.available}
                    />
                    <NumberInput
                        min={0}
                        label="Damaged"
                        name="damaged"
                        placeholder='Amount of damaged items'
                        onChange={(e) => handleChange(e, 'damaged')}
                        withAsterisk
                        required
                        value={formValue.damaged}
                    />
                    {selectedItem.id && <NumberInput
                        min={0}
                        label="Amount"
                        name="amount"
                        placeholder='Amount of request items'
                        onChange={(e) => handleChange(e, 'amount')}
                        withAsterisk
                        required
                        value={formValue.amount}
                    // error={errors.email}
                    />}
                    <div className="flex items-center justify-center gap-4">
                        <Button type="submit" fullWidth>Submit</Button>
                        <Button onClick={closeActionModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal>
        )
    }

    return (
        <>
            <LoadingOverlay visible={overlayLoading} overlayProps={{ blur: 2 }} loader={<></>} />
            <>
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <Button size="xs" className='size-sm'>Action</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Request for Restock", id: 1 })
                            }}
                        >
                            Request For Restock
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Request for Repair", id: 2 })
                            }}
                        >
                            Request For Repair
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="blue"
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Edit Item" })
                            }}
                        >
                            Edit Item
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            onClick={handleDelete}
                        >
                            Delete Item
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </>
            <ActionModal />
        </>
    );
}
