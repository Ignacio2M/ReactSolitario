import React from 'react';
import { useState } from 'react'
import Card from './card';
import ColumCard from './cardColumn';
const _ = require('lodash');
const { forwardRef, useRef, useImperativeHandle, useEffect } = React;

const CardSets = forwardRef(({ cardsList, numColums }, ref) => {


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

    const refListCard = useRef()


    const compareList = (listObject, listTarget) => {
        const include = _.size(listObject.filter((cardObject) => _.size(listTarget.filter((cardTarget) => cardTarget.id == cardObject.id)) > 0)) > 0
       return include
    }
    
    const updateCard = (cards, id) => {
        // console.log(id)
        // console.log(cards)



        // Remove card
        const igualCardSize = grupsCards.map((cardsList) => compareList(cardsList, cards))
        const indexList = _.findIndex(igualCardSize, (contain) => contain);
        const a = grupsCards
        a[indexList] = a[indexList].filter((card) => !_.size(cards.filter((cardTarget) => cardTarget.id == card.id))> 0)
        setGrupsCards(a)
        console.log(grupsCards)
        refListCard.current.updateCards()
        
        // if (indexList){
        //     console.log(grupsCards[indexList].card)
        //     grupsCards[indexList].card = [...grupsCards[indexList].card, ...cards]
        //     console.log(grupsCards[indexList].card)
        
        //     var evens = _.remove(grupsCards[id].card, function(n) {
        //         return cards.find((card) => card.id == n.id);
        //       });
        //     console.log(evens)

        // }
    }


    const colums = grupsCards.map((cardInfo, index) => <ColumCard listCards={cardInfo} id={index} updateCard={updateCard} ref={refListCard}/>)


    return (
        <div
            // className="card"
        // draggable="true"
        // onDragStart={handleDragStart}
        // onDragOver={handleDragOver}
        // onDrop={handleDrop}

        >
            {colums}
        </div>
    );
});

export default CardSets;
