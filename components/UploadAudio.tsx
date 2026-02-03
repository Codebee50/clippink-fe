import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegFileAudio } from "react-icons/fa";

const SUPPORTED_FORMATS = ['.mp3', '.wav', '.ogg'];

const UploadAudio = ({ onFileChange }: { onFileChange: (file: File | null) => void }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const handleFile = (file: File | null) => {
        // You can update state or call an onChange prop here
        // e.g., setUploadedFile(file);
        // For now, just log
        console.log('File chosen:', file);
        setSelectedFile(file);
        onFileChange(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length === 1) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className='w-full flex flex-col gap-2'>

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
      `

                }


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


            {
                selectedFile && <div className='w-full flex flex-col gap-2'>
                    <p className='text-white text-sm'>Selected file:</p>
                    <div className='w-full flex flex-row items-center justify-between flex-nowrap bg-denary border border-greys1/30 rounded-md px-2 py-4'>
                        <div className='flex flex-row items-center gap-2'>
                            <FaRegFileAudio size={20} className="text-senary" />
                            <div className='flex flex-col gap-1'>

                                <p className='text-white text-sm truncate max-w-[200px]'>{selectedFile.name}</p>
                                <p className='text-greys2 text-xs'>
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>


                            </div>
                        </div>
                        <button onClick={() => handleFile(null)} className='text-xs text-white bg-greys3 hover:bg-greys4/80 transition-all duration-300 border rounded-md border-greys1/40 px-4 py-2 cursor-pointer text-nowrap'>Remove</button>
                    </div>
                </div>
            }
        </div>

    );
};

export default UploadAudio;