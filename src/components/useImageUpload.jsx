import React, { useState } from 'react'

export default function useImageUpload() {
    const [isImageLoading, setIsLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(undefined)
    const [imagePreview, setImagePreview] = useState(null)
    const [errorImage, setError] = useState(null)

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleImageUpload = async (handleSubmit, values, setOverlayLoading) => {
        setIsLoading(true)
        if (profileImage && (
            profileImage.type == 'image/png' ||
            profileImage.type == 'image/jpg' ||
            profileImage.type == 'image/jpeg' ||
            profileImage.type == 'image/webp'
        )) {
            setError(null)
            const image = new FormData()
            image.append('file', profileImage)
            image.append('cloud_name', 'shajib')
            image.append('upload_preset', 'shajib-cloud')

            fetch('https://api.cloudinary.com/v1_1/shajib/image/upload', {
                method: "POST",
                body: image
            })
                .then(res => res.json())
                .then(data => {
                    setImageUrl(data.url);
                    // console.log(imageUrl)
                    setIsLoading(false)
                    handleSubmit(data.url, values)
                })
        }
        else {
            setError(errorImage+1);
            console.log('Image is requireddddd')
            setOverlayLoading(false)
        }
        setIsLoading(false)
    }
    return {
        handleImageChange,
        handleImageUpload,
        isImageLoading,
        imagePreview,
        imageUrl,
        errorImage
    }
}
