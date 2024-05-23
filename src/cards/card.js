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
const { forwardRef, useRef, useImperativeHandle } = React;

const Card = forwardRef(({ indxType, indxNumber, handleDragStart_parent}, ref) => {
  const width = 177;
  const height = 268;

  const getStarPoint = () =>{
    const x = 15 + indxNumber * 196
    const y = 17 + indxType * 285
    // console.log(`-${x}px -${y}px`)
    return `-${x}px -${y}px`
  }


  const [skin, setSkin] = useState('-15px -1157px');
  const [developed, setDeveloped] = useState(false);
  const [positon, setPosition] = useState({top:0, left:0})

  const handleDragStart = (e) => {
    handleDragStart_parent(indxType, indxNumber)
    e.dataTransfer.setData('indxType', indxType);
    e.dataTransfer.setData('indxNumber', indxNumber);
  };

    const flipCard =() => {
    setDeveloped(!developed)
    if (!developed) {
      setSkin('-15px -1157px')
    }else{
      setSkin(getStarPoint)
    }
  }


  useImperativeHandle(ref, () => ({
    flipCard () {flipCard()},
    moveCard (x, y) {setPosition({top:y, left:x})}
  }));



  

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
                position: 'relative',
                top: `${positon.top}px`,
                left: `${positon.left}px`
              }}
        draggable="true"
      onDragStart={handleDragStart}
      onClick={()=> flipCard()}
    ></div>
  );
});

export default Card;
