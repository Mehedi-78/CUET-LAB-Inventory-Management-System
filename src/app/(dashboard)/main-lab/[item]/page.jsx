'use client'

import BlurImage from '@/components/BlurImage'
import React, { useEffect, useState } from 'react'
import DemandItem from './DemandItem'
import ManagerAction from './ManagerAction';
import { useUserContext } from '@/context/ContextProvider';

export default function Item({ params }) {
  const { user } = useUserContext()
  const [item, setItem] = useState({})

  const getItem = () => {
    fetch('https://lab-inventory.vercel.app/api/item/getItem', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params.item)
    })
      .then(res => res.json())
      .then(data => {
        setItem(data)
      })
  }

  useEffect(() => {
    getItem()
  }, [])

  return (
    <section className='container'>
      <div className="card max-w-[800px] mx-auto space-y-4 bg-white rounded-md p-4 border border-blight-1">
        <div className=''>
          <BlurImage src={item.image} alt='Item Image' className='max-h-[400px] w-auto mx-auto !overflow-hidden' />
        </div>
        <div className='flex justify-between sm:items-end sm:flex-row flex-col gap-4'>
          <div>
            <div className="title">{item.name}</div>
            <div className='gap-4 flex items-center'>
              <div className='chip px-2 !text'>Available - {item.available}</div>
              <div className='chip px-2 r !text'>Damaged - {item.damaged}</div>
            </div>
          </div>
          <div className='gap-4 flex'>
            {user?.role == 'manager' && <ManagerAction item={item} setItem={setItem} />}
            {user?.role == 'asistant' && <DemandItem item={item} />}
          </div>
        </div>

        <div className='text'>{item.description}</div>

      </div>
    </section>
  )
}
