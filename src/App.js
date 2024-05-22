// import React, { useState } from 'react';
// import ImageCropper from './utils/ImageCropper';

// const App = () => {
//   const [image, setImage] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);

//   const onImageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = () => {
//         setImage(reader.result);
//       };
//     }
//   };

//   const onCropComplete = (croppedImage) => {
//     setCroppedImage(croppedImage);
//   };

//   return (
//     <div>
//       <input type="file" onChange={onImageChange} />
//       {image && (
//         <ImageCropper imageSrc={image} onCropComplete={onCropComplete} />
//       )}
//       {croppedImage && (
//         <div>
//           <h2>Imagen Recortada:</h2>
//           <img src={croppedImage} alt="Cropped" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React from 'react';
import Card from './cards/card';
import DropZone from './cards/dropZone';

const App = () => {
  

  return (
    // <div>

    //   <h1>Cartas de la Baraja</h1>
    //   <Card x={13} y={18} width={181} height={268} /> {/* Ejemplo de carta 1 */}
    //   <Card x={120} y={0} width={100} height={150} /> {/* Ejemplo de carta 2 */}
    //   {/* Agrega más componentes Card con las coordenadas y dimensiones de cada carta */}
    // </div>

    <div>
      <h1>Arrastrar y Soltar Cartas</h1>
      
      <div className="card-container">
      <Card  indxType={0} indxNumber={0} />
      <Card  indxType={1} indxNumber={0} />
      <Card  indxType={2} indxNumber={0} />
      <Card  indxType={3} indxNumber={0} />
      <Card  indxType={4} indxNumber={0} />




        {/* Agrega más componentes Card según sea necesario */}
      </div>
      <DropZone />
    </div>
  );
};

export default App;
