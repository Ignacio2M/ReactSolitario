import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { cropImage } from './cropImage'; // Asegúrate de importar la función correctamente

const ImageCropper = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropComplete = async () => {
    const croppedImage = await cropImage(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <div>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropCompleteHandler}
      />
      <button onClick={handleCropComplete}>Recortar</button>
    </div>
  );
};

export default ImageCropper;
