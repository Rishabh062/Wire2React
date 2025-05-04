"use client"
import React, { ChangeEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CloudUploadIcon, Loader2, Loader2Icon, WandSparkles, X } from 'lucide-react'
import Image from 'next/image'
import uuid4 from "uuid4";
import axios from 'axios'
import { useAuthContext } from '@/app/provider'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Constants from '@/data/Constants';

const ImageUpload = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [model, setModel] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { user } = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setFile(files[0]);
            const imageUrl = URL.createObjectURL(files[0]);
            setPreviewUrl(imageUrl)
        }
    }

    const onConvertToCode = async () => {
        if (!file || !model || !description) {
            console.log("Select All Field");
            return;
        }
        setLoading(true);
        let imageUrl = "";

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'wireframe_to_code');
        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_API_CLOUD_NAME || '');
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_API_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            imageUrl = data.secure_url;
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
        }

        const uid = uuid4();
        // save to database
        const result = await axios.post('/api/wireframe-to-code', {
            uid: uid,
            description: description,
            imageUrl: imageUrl,
            model: model,
            email: user?.email
        });

        if (result.data?.error) {
            console.log("Not Enough credits");
            toast.error('Not Enough Credits!');
            setLoading(false);
            return;
        }
        setLoading(false);
        router.push('/view-code/' + uid);
    }

    return (
        <div className='mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                    !previewUrl && (
                        <div className='p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center'>
                            <CloudUploadIcon className='h-10 w-10 text-primary' />
                            <h2 className='font-bold text-lg'>Upload Image</h2>
                            <div>User Input TextArea</div>
                            <p className='text-gray-400 mt-3'>
                                Click Button & Select Wireframe Image
                            </p>
                            <div className='p-5 border border-dashed w-full flex justify-center mt-7'>
                                <label htmlFor="imageSelect">
                                    <h2 className='p-2 bg-blue-100 font-medium text-primary rounded-md px-5 cursor-pointer'>Select Image</h2>
                                </label>
                                <input
                                    type="file"
                                    id="imageSelect"
                                    className='hidden'
                                    multiple={false}
                                    onChange={onImageSelect}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    previewUrl && (
                        <div className='p-5 border border-dashed rounded-md shadow-md flex flex-col items'>
                            <Image
                                src={previewUrl}
                                width={500}
                                height={500}
                                className='w-full h-[300px] object-contain'
                                alt='Input Image'
                            />
                            <X className='flex justify-end w-full cursor-pointer'
                                onClick={() => setPreviewUrl(null)}
                            />
                        </div>
                    )
                }

                <div className='p-7 border shadow-md rounded-lg'>
                    <h2 className='font-bold text-lg'>Select AI Model</h2>
                    <Select value={model} onValueChange={(value) => setModel(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Constants.AiModelLists.map((model, index) => (
                                    <SelectItem value={model.name} key={index}>
                                        <div className='flex items-center gap-2'>
                                            <Image
                                                src={model.icons}
                                                alt={model.name}
                                                width={25}
                                                height={25}
                                            />
                                            <h2>{model.name}</h2>
                                        </div>
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>

                    <h2 className='font-bold text-lg mt-7'>
                        Enter Description about your webpage
                    </h2>
                    <Textarea className='mt-3 h-[200px]' placeholder='Write about your web page' value={description} onChange={(e) => setDescription(e?.target.value)} />
                </div>
            </div>
            <div className='mt-10 flex items-center justify-center'>
                <Button disabled={loading} className='flex gap-2' onClick={onConvertToCode}>
                    {
                        loading ? (
                            <Loader2Icon className='animate-spin' />
                        ) : (
                            <WandSparkles />
                        )
                    }
                    Convert to Code
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload