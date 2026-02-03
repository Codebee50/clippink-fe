import React, { useState } from 'react'
import UploadAudio from '../UploadAudio'
import LoadingButton from '../buttons/LoadingButton';
import baseApiClient from '@/lib/axios/api';

const UpdateBackgroundAudio = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (file: File | null) => {
        console.log(file);
        setSelectedFile(file)
    }

    const generatePresignedUrl = async () => {
        const response = await baseApiClient.get("/assets/generate-presigned-url/")
        if (response.status === 200) {

        }
    }
    return (
        <div className='w-full flex flex-col gap-2'>
            <UploadAudio onFileChange={handleFileChange} />
            {
                selectedFile && <LoadingButton text={`Update Background Audio`} isLoading={false} />
            }
        </div>
    )
}

export default UpdateBackgroundAudio