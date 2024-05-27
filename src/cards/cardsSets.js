import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ColumCard from './cardColumn';
import DiscarSet from './discardedSetCard';
import ReservedCards from './resrvedCards';

const _ = require('lodash');


const { forwardRef, useRef, useImperativeHandle, useEffect } = React;

const CardSets = ({ cardsList, numColumns }) => {


  const shuffleCards = () => {
    // shuffle
    for (let i = _.size(cardsList) - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsList[i], cardsList[j]] = [cardsList[j], cardsList[i]];
    }

    const supSetColum = (_listCards, numItems) => {

      if (_.size(_listCards) < numItems) {
        throw new Error(`Can't be crate new supSet: ${_.size(_listCards)} > ${numItems}`);
      }

      const supSet = _.cloneDeep(_.slice(_listCards, 0, numItems))
      _listCards = _.differenceBy(_listCards, supSet, 'id')

      _.last(supSet).revelate = true
      _.last(supSet).canMove = true

      if (numItems == 1) {
        return [supSet, _listCards]
      } else {
        const listSupSets = supSetColum(_listCards, numItems - 1)
        return [supSet, ...listSupSets]
      }
    }

    return supSetColum(cardsList, numColumns)
  }

  const buildDictData = () => {
    // Game columns
    // const columsGame = (numColumns) => {
    //   if (numColumns == 0){
    //     return [{type: 'columGame', index: 0}]

    //   }else{
    //     const colum = {type: 'columGame', index: numColumns}
    //     const clomunDict = columsGame(numColumns-1)
    //     return[...clomunDict, colum]
    //   }
    // }
    // const cloums = columsGame(numColumns)


    // return [...cloums, {type: 'reservePack', index: numColumns+1}]

    const colums = shuffleCards()
    const columnsDict = colums.map((setCards, index) => { return { type: 'columGame', cards: setCards, index: index } })
    _.last(columnsDict).type = "reservePack"
    return columnsDict

  }

  // const [grupsCards, setGrupsCards] = useState(shuffleCards)
  const [grupsCardsDict, setGrupsCardsDict] = useState(buildDictData)
  const [discarSet, setDescarSet] = useState([[], [], [], []])






  const moveCard = (fromColumn, toColumn, card) => {
    console.log({
      fromColumn: fromColumn,
      toColumn: toColumn,
      card: card
    })

    const updateCards = (prevColumns) => {
      const copyGrupsCardsDict = _.cloneDeep(prevColumns)

      if (fromColumn.type == 'columGame') {
        const fromColumnInfoIndex = _.findIndex(copyGrupsCardsDict, (columInfo) => columInfo.index == fromColumn.index && columInfo.type == fromColumn.type)
        if (fromColumnInfoIndex > -1 && toColumn.type == 'columGame') {
          const fromColumnInfo = { ...copyGrupsCardsDict[fromColumnInfoIndex] }
          const toColumnInfoIndex = _.findIndex(copyGrupsCardsDict, (columInfo) => columInfo.index == toColumn.index && columInfo.type == toColumn.type)
          const toColumnInfo = { ...copyGrupsCardsDict[toColumnInfoIndex] }
          // Find index of card
          const indexCard = _.findIndex(fromColumnInfo.cards, (originalCard) => originalCard.id == card.id)
          if (indexCard > -1) {
            const cardsPack = _.slice(fromColumnInfo.cards, indexCard, _.size(fromColumnInfo.cards))
            console.log(cardsPack)
            // Remove cards fron fromColumnInfo
            fromColumnInfo.cards.splice(indexCard, _.size(cardsPack))
            // Add cards toColum
            toColumnInfo.cards = [...toColumnInfo.cards, ...cardsPack]

          }
          // Flip las card
          const lastCardToColum = _.last(fromColumnInfo.cards)
          if (lastCardToColum && (!lastCardToColum.revelate || !lastCardToColum.canMove)) {
            _.last(fromColumnInfo.cards).revelate = true
            _.last(fromColumnInfo.cards).canMove = true
          }
          copyGrupsCardsDict[fromColumnInfoIndex] = fromColumnInfo;
          copyGrupsCardsDict[toColumnInfoIndex] = toColumnInfo;
          console.log(copyGrupsCardsDict)
          return copyGrupsCardsDict

        }
      }
      else if (fromColumn.type == 'reservePack'){
        const fromColumnInfoIndex = _.findIndex(copyGrupsCardsDict, (columInfo) => columInfo.index == fromColumn.index && columInfo.type == fromColumn.type)
        if (fromColumnInfoIndex > -1 && toColumn.type == 'columGame') {
          const fromColumnInfo = { ...copyGrupsCardsDict[fromColumnInfoIndex] }
          const toColumnInfoIndex = _.findIndex(copyGrupsCardsDict, (columInfo) => columInfo.index == toColumn.index && columInfo.type == toColumn.type)
          const toColumnInfo = { ...copyGrupsCardsDict[toColumnInfoIndex] }
          // Find index of card
          const indexCard = _.findIndex(fromColumnInfo.cards, (originalCard) => originalCard.id == card.id)
          if (indexCard > -1) {
            const cardRemplace = {... fromColumnInfo.cards[indexCard]}
            // Remove cards fron fromColumnInfo
            fromColumnInfo.cards.splice(indexCard, 1)
            // Add cards toColum
            toColumnInfo.cards = [...toColumnInfo.cards, cardRemplace]
          }
          console.log(fromColumnInfo)
          copyGrupsCardsDict[fromColumnInfoIndex] = fromColumnInfo;
          copyGrupsCardsDict[toColumnInfoIndex] = toColumnInfo;
          return copyGrupsCardsDict

        }
      }
      return grupsCardsDict

    }

    setGrupsCardsDict(prevColumns => updateCards(prevColumns))

  };

  const flipCard = (fromColumn, card) => {
    // console.log({
    //   fromColumn:fromColumn,
    //   card: card
    // })

    const flip = (prevColumns) =>{
      const copyGrupsCardsDict = _.cloneDeep(prevColumns)
      const fromColumnInfoIndex = _.findIndex(copyGrupsCardsDict, (columInfo) => columInfo.index == fromColumn.index && columInfo.type == fromColumn.type)
      if (fromColumnInfoIndex > -1) {
        const fromColumnInfo = { ...copyGrupsCardsDict[fromColumnInfoIndex] }
        // Find index of card
        const indexCard = _.findIndex(fromColumnInfo.cards, (originalCard) => originalCard.id == card.id)
        if (indexCard > -1) {
          fromColumnInfo.cards[indexCard].revelate = !fromColumnInfo.cards[indexCard].revelate
          fromColumnInfo.cards[indexCard].canMove = !fromColumnInfo.cards[indexCard].canMove
        }
        copyGrupsCardsDict[fromColumnInfoIndex] = fromColumnInfo;
        // console.log(copyGrupsCardsDict)
        return copyGrupsCardsDict
      }
      return prevColumns
    }

    if (fromColumn.type == 'reservePack'){
      setGrupsCardsDict(prevColumns => flip(prevColumns))
    }

    // setGrupsCards(prevColumns => {
    //   // Clonar las columnas para evitar mutación directa
    //   const newColumns = [...prevColumns];
    //   const fromColumnCards = [...newColumns[fromColumn]];

    //   const cardIndex = fromColumnCards.indexOf(card);
    //   if (cardIndex > -1) {
    //     card.revelate = !card.revelate
    //     card.canMove = !card.canMove
    //     fromColumnCards.splice(cardIndex, 1);
    //     const newFromColumnCards = [...fromColumnCards, card]
    //     newColumns[fromColumn] = newFromColumnCards;
    //     return newColumns;
    //   }
    //   return prevColumns;
    // })

  }

  const sowCards = () => {
    // console.log(grupsCardsDict)
  }


  return (
    <DndProvider backend={HTML5Backend}>
      <div className='reservationPack'>
        {grupsCardsDict.filter((columsInfo) => columsInfo.type == "reservePack").map((columsInfo) => {
          console.log(`${columsInfo.type}_${columsInfo.index}_${_.size(columsInfo.cards.filter((card) => card.revelate && card.canMove))}`)
          return ( <ReservedCards
            key={`${columsInfo.type}_${columsInfo.index}_${_.size(columsInfo.cards.filter((card) => card.revelate && card.canMove))}`}
            cardsList={columsInfo.cards}
            column={{ index: columsInfo.index, type: columsInfo.type }}
            flipCard={flipCard}
          />)
        }
          )}

      </div>
      <div className='gameZone'
      // onClick={() => sowCards()}
      >
        <div className='column'>
          {grupsCardsDict.filter((columsInfo) => columsInfo.type == "columGame").map((columsInfo) => {
            // console.log({index: columsInfo.index, type: columsInfo.type})
            return (<ColumCard
              key={`${columsInfo.type}_${columsInfo.index}_${_.size(columsInfo.cards)}`}
              listCards={columsInfo.cards}
              column={{ index: columsInfo.index, type: columsInfo.type }}
              moveCard={moveCard} />)
          }
          )}

          {/* {grupsCards.slice(0, numColumns).map((cardInfo, index) => (<ColumCard key={index} listCards={cardInfo} id={index} moveCard={moveCard} />))} */}
        </div>
      </div>

      {/* <div className='discarCoplums'>
        {discarSet.map((cardSet, index) => (<DiscarSet key={index} id={"discar"+index} listCard={cardSet} moveCard={moveCard}></DiscarSet>))}
      </div> */}
    </DndProvider>

  );
};

export default CardSets;
