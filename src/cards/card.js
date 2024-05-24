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
const { forwardRef, useRef, useImperativeHandle} = React;

const Card = ({ row, column, revelate, canMove, cardId }) => {
  const width = 177;
  const height = 268;

  const getStarPoint = () => {
    const x = 15 + column * 196
    const y = 17 + row * 285
    // console.log(`-${x}px -${y}px`)
    return `-${x}px -${y}px`
  }

  const startSking = () => {
    if (revelate){
      return getStarPoint()
    }else{
      return '-15px -1157px'
    }
  }


  const [skin, setSkin] = useState(startSking());
  const [developed, setDeveloped] = useState(revelate);
  const [positon, setPosition] = useState({ top: 0, left: 0 })

  const handleDragStart = (e) => {
    console.log("aaaaaaaaaaaaaaaaaa")
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('row', row);
    e.dataTransfer.setData('colum', column);
    e.dataTransfer.setData('revelate', revelate);
    e.dataTransfer.setData('canMove', canMove);    
  };

  const flipCard = () => {
    setDeveloped(!developed)
    if (!developed) {
      setSkin('-15px -1157px')
    } else {
      setSkin(getStarPoint())
    }
    console.log({ row, column, cardId })
  }



  // useImperativeHandle(ref, () => ({
  //   flipCard () {flipCard()},
  //   moveCard (x, y) {setPosition({top:y, left:x})}
  // }));





  return (
    <div
      
      style={{
        backgroundImage: 'url("Cards_a.png")',
        backgroundPosition: skin,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '20px',
        borderColor: 'black',
        borderStyle: 'solid',
        position: 'relative',
        top: `${positon.top}px`,
        left: `${positon.left}px`
      }}
      // draggable={canMove}
      onDragStart={handleDragStart}
      onClick={() => {flipCard()}}
      // cardId = {cardId}
    ></div>
  );
};

export default Card;
