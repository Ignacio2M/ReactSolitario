

import React from 'react';
import CardSets from './cards/cardsSets';
import {cardsInfo} from './cards/cardInfo'


const{useEffect } = React;


const App = () => {
  

  

  return (


    <div className='board'>
  
      <CardSets cardsList = {cardsInfo.cards} numColumns = {7} />
      
    </div>
  );
};

export default App;
