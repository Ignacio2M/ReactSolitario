import React from 'react';
import { useState } from 'react'
import { useDrag } from 'react-dnd';
import Card from "./card";

const _ = require('lodash');
const { useEffect } = React;


const ReservedCards = ({ cardsList, column, flipCard}) => {

    const [cards, setCards] = useState(cardsList);

    const [reverseCards, setReverseCards] = useState([])



    const _flipCard = () => {
        
        // setCards((cardsList) => {
        //     const newListCopy = [...cardsList]
        //     const indexLast = _.findLastIndex(newListCopy, (card) => !card.revelate && !card.canMove)
        //     if (indexLast > -1) {
        //         newListCopy[indexLast].revelate = true
        //         newListCopy[indexLast].canMove = true
                
        //         return newListCopy
        //     } else {

        //         return newListCopy.map((card) => {
        //             card.revelate = false;
        //             card.canMove = false;
        //             return card
        //         })

        //     }
        // })

        const indexLast = _.findLastIndex(cards, (card) => !card.revelate && !card.canMove)
        if (indexLast > -1){
            // console.log(cards[indexLast])
            flipCard(column, cards[indexLast])
        }else{
            cards.map((card) => {flipCard(column, card)})
        }

    }
    


    return (
        <div

            onClick={() => { _flipCard() }}
            style={{ position: "absolute" }}
        >

            <div style={{ position: "absolute" }}>
                {cards.filter((card) => !card.canMove).map((card) =>
                    (<Card key={card.id} card={card} fromColumn={column} positionStyle={"absolute"} />)
                )}
            </div>

            <div style={{ paddingLeft: "189px" }}>
                {cards.filter((card) => card.canMove).reverse().map((card) => {
                    // console.log(card)
                    return (<Card key={card.id} card={card} fromColumn={column} positionStyle={"absolute"} />)
                }

                )}
            </div>

        </div>
    );
};

export default ReservedCards;
