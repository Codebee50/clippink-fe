import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';

const SUPPORTED_FORMATS = ['.mp3', '.wav', '.ogg'];

const UploadAudio = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files.length === 1) {
            handleFile(files[0]);
        }
        // optionally: notify user if more than one file or invalid type
    };

    const handleFile = (file: File) => {
        // You can update state or call an onChange prop here
        // e.g., setUploadedFile(file);
        // For now, just log
        console.log('File chosen:', file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length === 1) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div
            className={`
        w-full 
        h-[180px] 
        border-2 
        border-dashed 
        ${isDragActive ? 'border-senary' : 'border-greys1/30'} 
        rounded-lg 
        flex 
        flex-col 
        items-center 
        justify-center 
        bg-denary
        cursor-pointer
        transition-colors
        select-none
      `}
            onClick={handleClick}
            onDragOver={e => {
                e.preventDefault();
                setIsDragActive(true);
            }}
            onDragEnter={e => {
                e.preventDefault();
                setIsDragActive(true);
            }}
            onDragLeave={e => {
                e.preventDefault();
                setIsDragActive(false);
            }}
            onDrop={handleDrop}
        >
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={SUPPORTED_FORMATS.join(',')}
                onChange={handleInputChange}
                multiple={false}
            />
            <span
                className="rounded-xl bg-greys1/10 flex items-center justify-center mb-2"
                style={{ width: 60, height: 60 }}
            >
                <IoCloudUploadOutline size={36} className="text-greys1/80" />
            </span>
            <p className="text-white font-semibold mt-1 mb-1 text-center">Upload your audio</p>
            <p className="text-greys2 text-sm text-center">MP3, WAV, OGG supported</p>
        </div>
    );
};

export default UploadAudio;