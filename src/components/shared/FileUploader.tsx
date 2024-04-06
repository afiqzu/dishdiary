import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import {Image} from "lucide-react";

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void
    mediaUrl: string
}
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [fileUrl, setFileUrl] = useState(mediaUrl)
    const [file, setFile] = useState<File[]>([])

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles)
            fieldChange(acceptedFiles)
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        }, [file]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': [
                '.png',
                '.jpeg',
                '.jpg',
                '.svg',
                '.PNG',
                '.JPEG',
                '.JPG',
                '.SVG',
            ],
        },
    })

    return (
        <div
            {...getRootProps()}
            className="flex flex-center flex-col rounded-xl cursor-pointer bg-gray-200 w-full items-center p-4"
        >
            <input {...getInputProps()} />
            {fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center items-center">
                        <img src={fileUrl} alt="image"/>
                    </div>
                    <p className='text-gray-700 mt-4 text-sm'>Click or drag photo to replace</p>
                </>
            ) : (
                <div className="flex flex-col items-center my-5 justify-center text-center gap-1 w-1/2">
                    <Image/>
                    <h1 className="font-medium text-lg">Drag photo here</h1>
                    <p className="text-sm">Drag and drop your PNG, JPG, or SVG photos here.</p>
                </div>
            )}
        </div>
    )
}
export default FileUploader