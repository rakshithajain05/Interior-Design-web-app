"use client"
import React, { useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebaseConfig'

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [generatedImage, setGeneratedImage] = useState(null);

  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const GenerateAiImage = async () => {
    try {
      const rawImageUrl = await SaveRawImageToFirebase();
      const result = await axios.post('/api/redesign-room', {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
      });

      console.log(result.data);
      setGeneratedImage(result.data.result);

    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, 'room-redesign/' + fileName);

    await uploadBytes(imageRef, formData.image);
    console.log('File Uploaded...');

    const downloadUrl = await getDownloadURL(imageRef);
    console.log(downloadUrl);
    return downloadUrl;
  };

  return (
    <div>
      <h2 className='font-bold text-4xl text-primary text-center'>
        Experience the Magic of AI Remodeling
      </h2>
      <p className='text-center text-gray-500'>
        Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        {/* Image Selection  */}
        <ImageSelection selectedImage={(value)=>onHandleInputChange(value,'image')}/>
        {/* Form Input Section  */}
        <div>
          <RoomType selectedRoomType={(value)=>onHandleInputChange(value,'roomType')}/>
          <DesignType selectedDesignType={(value)=>onHandleInputChange(value,'designType')}/>
          <AdditionalReq additionalRequirementInput={(value)=>onHandleInputChange(value,'additionalReq')}/>
          <Button className="w-full mt-5" onClick={GenerateAiImage}>Generate</Button>
          <p className='text-sm text-gray-400 mb-10'>
            NOTE: 1 Credit will be used to redesign your room
          </p>

          {generatedImage && (
            <div className="mt-5">
              <h3 className="font-semibold text-lg mb-2">Redesigned Room:</h3>
              <img src={generatedImage} alt="Redesigned Room" className="rounded-2xl shadow-lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateNew