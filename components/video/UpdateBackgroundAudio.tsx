import React, { useState } from 'react'
import UploadAudio from '../UploadAudio'
import LoadingButton from '../buttons/LoadingButton';
import baseApiClient from '@/lib/axios/api';
import usePostRequest from '@/hooks/usePost';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { genericErrorHandler } from '@/lib/errorHandler';
import useStyledToast from '@/hooks/useStyledToast';
import { useVideoStore } from '@/lib/store/video';
import { BackgroundAudio } from '@/lib/types/video';


type GeneratePresignedUrlResponse = {
    presigned_url: string;
    file_key: string;
}

const UpdateBackgroundAudio = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>("Uploading audio...")
    const [isUploadingToS3, setIsUploadingToS3] = useState<boolean>(false)
    const video = useVideoStore((state) => state.video)


    const toast = useStyledToast()

    const handleFileChange = (file: File | null) => {
        console.log(file);
        setSelectedFile(file)
    }

    const { mutate: updateBackgroundAudio, isLoading: isUpdatingBackgroundAudio } = usePostRequest({
        url: "/video/background-audio/change-url/",
        onSuccess: (response: AxiosResponse) => {
            const data= response.data as BackgroundAudio
            useVideoStore.setState((state)=>{
                if(!state.video) return state

                return {
                    video: {
                        ...state.video,
                        background_audio: data
                    }
                }
            })
            toast.success("Background audio updated successfully")
        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Failed to update background audio"))
        }
    })

    const uploadTos3 = async (presignedUrl: string, s3_file_key: string, file: File) => {
        setIsUploadingToS3(true)
        setLoadingMessage("Uploading audio file...")

        try {
            const response = await axios.put(presignedUrl, file, {
                headers: {
                    "Content-Type": file.type,
                }
            })


            if (video && selectedFile) {
                setLoadingMessage("Finishing up...")
                const requestBody = {
                    "video_id": video.id,
                    "s3_file_key": s3_file_key,
                    "background_audio_name":  selectedFile.name,
                    "background_audio_file_name": selectedFile.name
                }

                updateBackgroundAudio(requestBody)
            }
        }
        catch (error) {
            toast.error("File upload failed, please try again")
        }
        finally {
            setIsUploadingToS3(false)
        }

    }

    const { mutate: generatePresignedUrl, isLoading: isGeneratingPresignedUrl } = usePostRequest({
        url: "/assets/generate-presigned-url/",
        onSuccess: (response: AxiosResponse) => {
            const data = response.data as GeneratePresignedUrlResponse
            if (selectedFile) {
                uploadTos3(data.presigned_url, data.file_key, selectedFile)
            }
        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Could not generate presigned url"))
        }
    })

    const initiateBackgroundAudioUpdate = () => {
        if (!selectedFile) {
            toast.error("Please select an audio file")
            return
        }

        if (selectedFile.size > 50 * 1024 * 1024) {
            toast.error("Audio file size must be less than 50MB")
            return
        }

        setLoadingMessage("Preparing for upload...")

        generatePresignedUrl({
            file_name: selectedFile?.name,
            file_type: selectedFile?.type,
        })
    }

    const isPageLoading = () => isGeneratingPresignedUrl || isUploadingToS3 || isUpdatingBackgroundAudio
    return (
        <div className='w-full flex flex-col gap-2'>

            <UploadAudio onFileChange={handleFileChange} enabled={!isPageLoading()} />
            {
                selectedFile && <LoadingButton loadingText={loadingMessage} text={`Update Background Audio`} isLoading={isPageLoading()} onClick={initiateBackgroundAudioUpdate} />
            }
        </div>
    )
}

export default UpdateBackgroundAudio