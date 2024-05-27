import React from "react";
import Card from "./card";
import { useDrop } from 'react-dnd';

const _ = require('lodash');

const DiscarSet = ({id, listCard, moveCard}) => {
    const [, drop] = useDrop({
        accept: 'CARD',
        drop: (item) => {
            if (item.fromColumn !== id) {
                moveCard(item.fromColumn, id, item.card);
            }
        }
    });
    
    return (
        <div ref={drop} style={{
            height: "95px",
            width: "100px"
        }}>
            {_.size(listCard)>0? <Card key={_.last(listCard).id} card={_.last(listCard)} fromColumn={id} />: <></>}
        </div>
    );

};

export default DiscarSet