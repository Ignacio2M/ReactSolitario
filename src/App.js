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
// import Card from './cards/card';
import ColumCard from './cards/cardColumn';
import CardSets from './cards/cardsSets';
import DropZone from './cards/dropZone';
import {cardsInfo} from './cards/cardInfo'


const{useEffect } = React;


const App = () => {
  

  

  return (
    // <div>

    //   <h1>Cartas de la Baraja</h1>
    //   <Card x={13} y={18} width={181} height={268} /> {/* Ejemplo de carta 1 */}
    //   <Card x={120} y={0} width={100} height={150} /> {/* Ejemplo de carta 2 */}
    //   {/* Agrega más componentes Card con las coordenadas y dimensiones de cada carta */}
    // </div>

    <div className='board'>
      {/* <h1>Arrastrar y Soltar Cartas</h1>
      <div class="parent">
        <div class="colum3">
          <Card  indxType={0} indxNumber={0} />
          <Card  indxType={1} indxNumber={0} />
          <Card  indxType={2} indxNumber={0} />
          <Card  indxType={3} indxNumber={0} />
          <Card  indxType={4} indxNumber={0} />
        </div>
      </div>
      <DropZone /> */}

      {/* <ColumCard listCards={[{type:0, number:0}, {type:0, number:1}, {type:0, number:2}]} />
      <ColumCard listCards={[{type:1, number:0}, {type:1, number:1}, {type:1, number:2}]} /> */}

      <CardSets cardsList = {cardsInfo.cards} numColumns = {7} />
      
    </div>
  );
};

export default App;
