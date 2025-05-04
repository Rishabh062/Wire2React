import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'

const SelectionDetails = ({ record, regenerateCode }: any) => {
    return (
        record && (
            <div className='p-5 bg-gray-100 h-screen flex flex-col gap-5 rounded-lg'>
                <div className='flex flex-col gap-2 bg-blue-50 p-2 rounded-lg'>
                    <h2 className='text-2xl font-bold my-1'>Wireframe</h2>
                    <Image src={record?.imageUrl}
                        alt='image'
                        width={300}
                        height={400}
                        className='rounded-lg object-cover h-[200px] w-full border border-dashed p-2 bg-white' />
                </div>

                <div className='flex flex-col gap-2 bg-blue-50 p-2 rounded-lg'>
                    <h2 className='text-2xl font-bold my-1'>AI Model</h2>
                    <p className='text-gray-500 p-1 bg-white border border-dashed rounded-lg'>{record?.model}</p>
                </div>

                <div className='flex flex-col gap-2 bg-blue-50 p-2 rounded-lg'>
                    <h2 className='text-2xl font-bold my-1'>Description</h2>
                    <p className='text-gray-500 p-1 bg-white border border-dashed rounded-lg'>{record?.description}</p>
                </div>
                <div className='flex flex-col gap-2 bg-blue-50 p-2 rounded-lg'>
                    <Button onClick={() => regenerateCode()}>
                        <RefreshCcw className='w-4 h-4' />
                        Regenerate Code
                    </Button>
                </div>
            </div>
        )
    )
}

export default SelectionDetails
