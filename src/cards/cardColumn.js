import React from "react";
import { useState } from 'react'
import Card from "./card";
import FlipCardSet from "./fipCardsSet";
const { forwardRef, useRef, useImperativeHandle, useEffect } = React;
const _ = require('lodash');

const ColumCard = forwardRef(({ listCards, updateCard, id }, ref) => {

    const reverseRef = useRef();

    const [grupCard, setGrupCard] = useState(listCards)


    // const cards = grupCard.filter((card) => !card.canMove).map((card) =>
    //     <Card row={card.row}
    //         column={card.colum}
    //         revelate={card.revelate}
    //         canMove={card.canMove}
    //         cardId={card.id} />)


    const cards = _.reduceRight(grupCard, (result, card) => {
        const cardHtml = <Card row={card.row}
            column={card.colum}
            revelate={card.revelate}
            canMove={card.canMove}
            cardId={card.id} />

        return <div className="set" draggable={card.canMove}>
            {cardHtml}
            <div className="card">
                {result}
            </div>

        </div>
    }

        , <></>)

    const revelateCard = <FlipCardSet listCards={grupCard.filter((card) => card.canMove)} ref={reverseRef} />

    const handleDrop = (e) => {

        // e.preventDefault();
        // console.log(e.dataTransfer.getData('tepy'))

        if (e.dataTransfer.getData('tepy') == 'relevateColums') {
            const cardsMoveds = JSON.parse(e.dataTransfer.getData('cardsInfo'))

            if (_.size(cardsMoveds.filter(elemento => _.size(grupCard.filter((card) => elemento.id == card.id)) > 0)) == 0) {
                setGrupCard([...grupCard, ...cardsMoveds])
                updateCard(cardsMoveds, id)
            }
        }

    };

    useEffect(() => {
        // console.log(grupCard)
        const recverseCard = grupCard.filter((card) => card.canMove)
        // reverseRef.current.updateCards(recverseCard)
    }, [grupCard]);

    const handleDragOver = (e) => {
        e.preventDefault();
        // console.log("vcvvvvvv")
    };

    useImperativeHandle(ref, () => ({
        updateCards(newCards) { setGrupCard(newCards) }
    }));

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className='colum'>
            {cards}
            {/* {revelateCard} */}
            {/* <button onClick={() => childRef.current.flipCard()}>Click</button> */}
        </div>
    );



});
export default ColumCard;