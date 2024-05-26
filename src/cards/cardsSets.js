import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ColumCard from './cardColumn';
import ReservedCards from './resrvedCards';

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

    // reserve pack of cards
    setsCards = [...setsCards, new_list]

    return setsCards
  }


  const [grupsCards, setGrupsCards] = useState(shafelCards)


  const moveCard = (fromColumn, toColumn, card) => {
    // console.log({
    //   fromColumn: fromColumn, 
    //   toColumn: toColumn, 
    //   card: card
    // })



    setGrupsCards(prevColumns => {
      // Clonar las columnas para evitar mutación directa
      const newColumns = [...prevColumns];
      const fromColumnCards = [...newColumns[fromColumn]];
      const toColumnCards = [...newColumns[toColumn]];

      const cardIndex = fromColumnCards.indexOf(card);
      console.log(cardIndex)

      // Expecial cases
      if (cardIndex > -1 && fromColumn == _.size(grupsCards)-1){
        
        fromColumnCards.splice(cardIndex, 1);
        const newToColumnCards = [...toColumnCards, card]

        newColumns[fromColumn] = fromColumnCards;
        newColumns[toColumn] = newToColumnCards;
        // console.log(newColumns)
        return newColumns;
      }
      // Normal Case
      else if (cardIndex > -1 && card.canMove) {
        const setCartReverse = _.slice(fromColumnCards, cardIndex, _.size(fromColumnCards))

        fromColumnCards.splice(cardIndex, _.size(setCartReverse));
        const newToColumnCards = toColumnCards.concat(setCartReverse);
        if (_.size(fromColumnCards) > 0) {
          _.last(fromColumnCards).revelate = true
          _.last(fromColumnCards).canMove = true
        }

        newColumns[fromColumn] = fromColumnCards;
        newColumns[toColumn] = newToColumnCards;

        return newColumns;
      }
      return prevColumns;

    });

  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className='reservationPack'>
      {grupsCards.slice(numColums, _.size(grupsCards)).map((cardInfo, index) => (<ReservedCards cardsList={cardInfo} id={_.size(grupsCards)-1}></ReservedCards>))}

      </div>
      <div className='gameZone'>
        <div className='column'>
          {grupsCards.slice(0, numColums).map((cardInfo, index) => (<ColumCard key={index} listCards={cardInfo} id={index} moveCard={moveCard} />))}
        </div>
      </div>
    </DndProvider>

  );
};

export default CardSets;
