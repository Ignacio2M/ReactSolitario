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
import { useDrag } from 'react-dnd';

const { forwardRef, useRef, useImperativeHandle} = React;


const Card = ({card, fromColumn, positionStyle}) => {
  const width = 177;
  const height = 268;

  const getStarPoint = () => {
    const x = 15 + card.column * 196
    const y = 17 + card.row * 285
    // console.log(card)
    // console.log(`-${x}px -${y}px`)
    return `-${x}px -${y}px`
  }

  const startSking = () => {
    if (card.revelate){
      return getStarPoint()
    }else{
      return '-15px -1157px'
    }
  }


  const [skin, setSkin] = useState(startSking());
  const [developed, setDeveloped] = useState(card.revelate);
  const [positon, setPosition] = useState({ top: 0, left: 0 })

  

  const flipCard = () => {
    // console.log(card)
    // setDeveloped(!developed)
    // if (!developed) {
    //   setSkin('-15px -1157px')
    // } else {
    //   setSkin(getStarPoint())
    // }
  }

  const [, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', card, fromColumn },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    
  });

  return (
    <div
    ref={drag}
      style={{
        backgroundImage: 'url("Cards_a.png")',
        backgroundPosition: skin,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '20px',
        borderColor: 'black',
        borderStyle: 'solid',
        position:positionStyle? positionStyle : 'relative'
      }}
      // draggable={canMove}
      // onDragStart={handleDragStart}
      onClick={() => {flipCard()}}
      // cardId = {cardId}
    ></div>
  );
};

export default Card;
