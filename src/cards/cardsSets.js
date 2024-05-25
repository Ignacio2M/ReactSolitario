import React from 'react';
import { useState } from 'react'
import Card from './card';
import ColumCard from './cardColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isEqual } from 'lodash';

const _ = require('lodash');


const { forwardRef, useRef, useImperativeHandle, useEffect } = React;

const CardSets = ({ cardsList, numColums }) => {


    const shafelCards = () => {
        for (let i = cardsList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsList[i], cardsList[j]] = [cardsList[j], cardsList[i]];
        }

        let new_list = cardsList
        let setsCards = []
        // console.log(grupsCards)

        for (let i = numColums - 1; i >= 0; i--) {
            const supSet = _.slice(new_list, 0, i + 1)
            new_list = new_list.filter(elemento => !supSet.includes(elemento));
            _.last(supSet).revelate = true
            _.last(supSet).canMove = true
            // console.log(_.last(supSet))
            setsCards = [supSet, ...setsCards]
        }

        return setsCards
    }


    const [grupsCards, setGrupsCards] = useState(shafelCards)


    const moveCard = (fromColumn, toColumn, card) => {
        setGrupsCards(prevColumns => {
           // Clonar las columnas para evitar mutación directa
          const newColumns = [...prevColumns];
          const fromColumnCards = [...newColumns[fromColumn]];
          const toColumnCards = [...newColumns[toColumn]];

          const cardIndex = fromColumnCards.indexOf(card);
          
        

          if (cardIndex > -1 && card.canMove) {
            const setCartReverse = _.slice(fromColumnCards, cardIndex, _.size(fromColumnCards))

            fromColumnCards.splice(cardIndex, _.size(setCartReverse));
            const newToColumnCards = toColumnCards.concat(setCartReverse);
            if (_.size(fromColumnCards) > 0){
              _.last(fromColumnCards).revelate = true
              _.last(fromColumnCards).canMove = true
            }
            // console.log(fromColumnCards[0])
            // console.log(grupsCards[1][0])
            newColumns[fromColumn] = fromColumnCards;
            newColumns[toColumn] = newToColumnCards;
            // console.log(newColumns)
            return newColumns;
          }
          return prevColumns;
         
        });
        
      };
    


return (
  <DndProvider backend={HTML5Backend}>
    <div className='column'>
        {grupsCards.map((cardInfo, index) =>( <ColumCard key={index} listCards={cardInfo} id={index} moveCard={moveCard} />))}
    </div>
  </DndProvider>
    
);
};

export default CardSets;
