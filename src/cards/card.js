// import React from 'react';
// import card_imge from './Cards.png';

// const Card = ({ x, y, width, height }) => {
//   const cardStyle = {
//     backgroundImage: 'url("Cards.png")', // Reemplaza con la ruta de tu imagen sprite
//     backgroundPosition: `-${x}px -${y}px`,
//     width: width,
//     height: height,
//     borderRadius: '20px',
//     borderColor: 'black',
//     borderStyle: 'solid'


//   };

//   return <div className="card" style={cardStyle}></div>;
// };

// export default Card;


import React from 'react';
import { useState } from 'react'

const Card = ({ indxType, indxNumber }) => {
  const width = 177;
  const height = 268;

  const getStarPoint = () =>{
    const x = 15 + indxNumber * 196
    const y = 17 + indxType * 285
    console.log(`-${x}px -${y}px`)
    return `-${x}px -${y}px`
  }


  const [skin, setSkin] = useState('-15px -1157px');
  const [developed, setDeveloped] = useState(false);


  const flipCard = () => {
    setDeveloped(!developed)
    if (!developed) {
      setSkin('-15px -1157px')
    }else{
      setSkin(getStarPoint)
    }
  }

  const handleDragStart = (e) => {
    console.log(e)
    e.dataTransfer.setData('cardId', 'unique_card_id'); // Establece un identificador único para la carta
  };

  return (
    <div
      className="card"
      style={{  backgroundImage: 'url("Cards_a.png")', 
                backgroundPosition: skin, 
                width:`${width}px`, 
                height:`${height}px`,
                borderRadius: '20px',
                borderColor: 'black',
                borderStyle: 'solid',
                // position: 'absolute',
                top: '40px',
                left: '40px'
              }}
      //   draggable="true"
      // onDragStart={handleDragStart}
      onClick={()=> flipCard()}
    ></div>
  );
};

export default Card;
