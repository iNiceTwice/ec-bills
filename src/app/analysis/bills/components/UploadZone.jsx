"use client"

import { useState } from "react";
import { LuUpload } from "react-icons/lu";

const UploadZone = () => {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
      }
    
      const handleDragLeave = () => {
        setIsDragging(false)
      }
    
      const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        // Handle file drop logic here
      }

    return ( 
        <>
            <div className="">
                <div
                    className={`border-2 border-dashed rounded-lg p-24 flex flex-col items-center justify-center transition-colors
                    ${isDragging ? "border-primary bg-primary/5" : "border-slate-300"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <h3 className="text-xl font-medium text-slate-700 mb-2">
                    Fast Upload your bills in seconds and let AI extract the important data for you.
                    </h3>
                    <p className="text-slate-500 mb-6">Drop your files here or click to upload.</p>
                    <button className="btn btn-accent px-10">
                        <LuUpload className="h-4 w-4 mr-2" />
                        Select Files
                    </button>
                </div>
            </div>
        </>
    );
}
 
export default UploadZone;