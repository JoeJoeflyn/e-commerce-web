import React from "react";
import { toast } from "react-toastify";

const useImageUploadHandler = () => {
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageFiles = Array.from(files as FileList).filter((file) =>
      file.type.startsWith("image/")
    );

    const imageUrls = (
      await Promise.all(
        imageFiles.map(async (file) => {
          const base64 = await toBase64(file);
          return previewImages.includes(base64) ? [] : [base64];
        })
      )
    ).flat();

    const totalImages = previewImages.length + imageUrls.length;

    if (totalImages > 6) {
      toast.error("Only 6 images can be uploaded");
      const remainingSpace = 6 - previewImages.length;
      const imagesToAdd = imageUrls.slice(0, remainingSpace);
      setPreviewImages([...previewImages, ...imagesToAdd]);
      return;
    }

    if (previewImages.length < 6) {
      const remainingSpace = 6 - previewImages.length;
      const imagesToAdd = imageUrls.slice(0, remainingSpace);
      setPreviewImages([...previewImages, ...imagesToAdd]);
    } else {
      toast.error("Only 6 images can be uploaded");
    }
  };

  const handleRemoveImage = (url: string) => {
    setPreviewImages(previewImages.filter((imageUrl) => imageUrl !== url));
  };

  return {
    previewImages,
    handleFileChange,
    handleRemoveImage,
  };
};

export default useImageUploadHandler;

// Helper function for converting file to base64
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
