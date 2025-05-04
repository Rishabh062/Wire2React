'use client';
import AppHeader from '@/app/_components/AppHeader';
import Constants from '@/data/Constants';
import axios from 'axios';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import SelectionDetails from '../_components/SelectionDetails';
import CodeEditor from '../_components/CodeEditor';
import { Loader2 } from 'lucide-react';
export interface IResponse {
    id: number;
    uid: string;
    description: string;
    code: any;
    error: string;
    model: string;
    imageUrl: string;
    createdBy: string;

}

const ViewCode = () => {
    const { uid } = useParams();
    const [record, setRecord] = useState<IResponse | null>();
    const [loading, setLoading] = useState(false);
    const [codeResp, setCodeResp] = useState('');
    const [isReady, setIsReady] = useState(false);
    // const [isExist, setIsExist] = useState(false);'

    useEffect(() => {
        if (typeof window !== undefined) {
            uid && GetRecordInfo();

        }
    }, [uid])

    const GetRecordInfo = async (regen = false) => {
        setLoading(true);
        setIsReady(false);
        setCodeResp('');
        const result = await axios.get('/api/wireframe-to-code?uid=' + uid)
        const resp = result?.data;
        setRecord(resp);
        if (resp?.code == null || regen) {
            GenerateCode(resp);
        }
        else {
            setCodeResp(resp?.code?.resp);
            setLoading(false);
            setIsReady(true);
        }
        if (resp?.error) {
            toast.error(resp?.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        uid && GetRecordInfo();
    }, [uid]);

    const GenerateCode = async (record: IResponse) => {
        setLoading(true);
        const res = await fetch('/api/ai-model', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: record?.description + ":" + Constants.PROMPT,
                model: record?.model,
                imageUrl: record?.imageUrl
            })
        });
        if (!res.body) return;
        setLoading(false);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = (decoder.decode(value)).replace('```jsx', '').replace('```javascript', '').replace('javascript', '').replace('jsx', '').replace('```', '');
            setCodeResp((prev) => prev + text);

        }
        setIsReady(true);
        UpdateCodeToDb();
    }

    useEffect(() => {
        if (codeResp != '' && record?.uid && isReady && record?.code == null) {
            UpdateCodeToDb();
        }
    }, [codeResp && record && isReady])

    const UpdateCodeToDb = async () => {
        const result = await axios.put('/api/wireframe-to-code', {
            uid: record?.uid,
            codeResp: { resp: codeResp }
        });

        console.log(result);
    }

    return (
        <div>
            <AppHeader hideSideBar={true} />
            <div className='grid grid-cols-1 md:grid-cols-5 p-5 gap-10'>
                <div>
                    <SelectionDetails record={record} regenerateCode={() => { GetRecordInfo(true) }} />
                    {/* view the user selection detail */}
                </div>
                <div className='col-span-4'>
                    {loading ? (
                        <div>
                            <h2 className='font-bold text-2xl text-center p-20 flex items-center justify-center
                        bg-slate-100 h-[80vh] rounded-xl'> <Loader2 className='w-4 h-4 animate-spin' /> Analyzing your selection...</h2>
                        </div>
                    ) : (
                        <CodeEditor codeResp={codeResp} isReady={isReady} />
                    )}
                </div>

            </div>

            {/* Code Editor */}
        </div>
    )
}

export default ViewCode
