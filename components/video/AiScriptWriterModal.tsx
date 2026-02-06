import React, { useEffect, useState } from 'react'
import { PiMagicWand } from 'react-icons/pi'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useFormik } from 'formik'
import TextInput from '../inputs/TextInput'
import LoadingButton from '../buttons/LoadingButton'
import { LiaRandomSolid } from "react-icons/lia";
import { FaRegClock } from "react-icons/fa";
import { IoHappyOutline } from "react-icons/io5";
import { RiProgress8Line } from "react-icons/ri";
import usePostRequest from '@/hooks/usePost';
import { AxiosError, AxiosResponse } from 'axios'
import useStyledToast from '@/hooks/useStyledToast'
import { genericErrorHandler } from '@/lib/errorHandler'
import { makeMsUrl, WS_PROTOCOL } from '@/constants'
import ReconnectingWebSocket from 'reconnecting-websocket'


type InitiateScriptGenerationResponse = {
    message: string;
    task_id: string;

}

type TaskUpdateMessageBody = {
    message: string;
    type: "completed" | "failed" | "message";
    script?: string | null,

}

const AiScriptWriterModal = ({ onScriptGenerated = () => { } }: { onScriptGenerated?: (script: string) => void }) => {

    const toast = useStyledToast()

    const targetDurationOptions = [
        {
            label: "30s",
            value: 30
        },
        {
            label: "1m",
            value: 60
        },
        {
            label: "2m",
            value: 120
        },
        {
            label: "3m",
            value: 180
        }
    ]

    const [targetDuration, setTargetDuration] = useState<number>(30);
    const [isRandomIdea, setIsRandomIdea] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [taskId, setTaskId] = useState<string | null>(null);
    const [open, setOpen] = useState(false)

    const { mutate: initiateScriptGeneration, isLoading: isInitiatingScriptGeneration } = usePostRequest({
        url: "/video/script/ai-generate/",
        onSuccess: (response: AxiosResponse) => {
            const data = response.data as InitiateScriptGenerationResponse
            console.log(data.task_id)
            setTaskId(data.task_id)
            setMessages(prev => [...prev, "Script generation queued..."])

        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Failed to initiate script generation"))
        }
    })

    useEffect(() => {
        if (taskId) {
            console.log("connecting to task update ws")
            const rws = new ReconnectingWebSocket(`${makeMsUrl(`/ws/task/update/${taskId}`, WS_PROTOCOL)}`);
            rws.onmessage = (event) => {
                const data = JSON.parse(event.data) as TaskUpdateMessageBody
                console.log("data", data)
                if (data.type === "failed") {
                    toast.error(data.message)
                }

                if (data.type === 'completed') {
                    toast.success("Script generated successfully")
                    onScriptGenerated(data?.script ?? "")
                    setMessages(prev => [...prev, "Script generated successfully"])
                    setOpen(false)
                }

                if (data.type === "message") {
                    setMessages(prev => [...prev, data.message])
                }


            }
        }

    }, [taskId])


    const formik = useFormik({
        initialValues: {
            "user_prompt": "",
        },
        onSubmit: (values) => {
            initiateScriptGeneration({
                user_prompt: values.user_prompt,
                target_duration: targetDuration
            })

        }
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <button className="flex flex-row text-white bg-senary sm:px-4 px-4 py-2 rounded-sm text-sm text-nowrap gap-2 items-center cursor-pointer">
                    <PiMagicWand size={16} />
                    Write using AI
                </button>
            </DialogTrigger>
            <DialogContent className='bg-denary border-greys1/30  overflow-hidden  max-h-[95vh]'>
                <DialogHeader>
                    <DialogTitle className='font-medium text-start!'>AI Script writer</DialogTitle>
                    <DialogDescription className='text-start!'>
                        Enter an idea, or let AI suggest one.
                    </DialogDescription>

                    <div className='w-full mt-4'>
                        <form action="" onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-4'>

                            {
                                isRandomIdea ?

                                    <div className='w-full flex flex-col gap-2'>

                                        <div className='w-full flex flex-row items-center justify-between'>
                                            <p className='text-sm  text-greys2 max-sm:ml-1 capitalize'>Idea/Topic</p>



                                        </div>



                                        <div className='w-full flex flex-col gap-2 items-center justify-center bg-senary/10 border border-dashed border-greys1/30 rounded-sm px-4 py-6'>
                                            <p className='text-sm text-greys2'>
                                                Our AI will generate a random creative topic for you
                                            </p>
                                            <button className='flex flex-row items-center gap-2 px-3 py-2 rounded-sm text-sm text-nowrap hover:bg-greys3 cursor-pointer text-white bg-greys3 w-max mt-2' onClick={() => setIsRandomIdea(false)}>
                                                Enter my own idea instead

                                            </button>


                                        </div>
                                    </div>
                                    : <TextInput formik={formik} name='user_prompt' label='Whats on your mind?' placeholder='Enter your prompt or a video idea' labelSider={
                                        <button className='flex flex-row items-center gap-2 px-3 py-1 rounded-sm text-sm text-nowrap hover:bg-greys3 cursor-pointer text-greys2' onClick={() => setIsRandomIdea(true)}>
                                            <LiaRandomSolid />
                                            Random Idea

                                        </button>
                                    } />
                            }

                            <div className='flex flex-col gap-2 mt-5'>

                                <div className='flex flex-row items-center gap-2 text-sm text-greys2'>

                                    <FaRegClock />
                                    <p>Target Duration</p>

                                </div>

                                <div className='flex flex-row items-center gap-3'>
                                    {
                                        targetDurationOptions.map((option) => (
                                            <button type='button' key={option.value} onClick={() => setTargetDuration(option.value)} className={`flex flex-row items-center gap-2 px-3 py-1 rounded-sm text-sm text-nowrap hover:bg-greys3 cursor-pointer text-greys2 ${targetDuration === option.value ? 'bg-senary text-white' : 'text-greys2'}`}>
                                                {option.label}
                                            </button>
                                        ))
                                    }

                                </div>

                            </div>

                            <LoadingButton text='Generate Script' type='submit' isLoading={isInitiatingScriptGeneration} loadingText={"Processing..."} />
                        </form>

                        <div className='w-full flex flex-col gap-2 mt-5 max-h-[100px] overflow-y-scroll cus-scrollbar'>

                            {
                                messages.map((message, index) => (
                                    <div key={index} className='w-full flex flex-row items-center gap-2 text-sm text-greys2'>
                                        <RiProgress8Line className='text-senary' />
                                        <p>{message}</p>
                                    </div>
                                ))
                            }

                        </div>



                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default AiScriptWriterModal