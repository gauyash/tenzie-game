import { useEffect, useState } from "react";
import "./App.css";
import { Die } from "./Component/Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);


  useEffect(()=>{

    const allHeld=dice.every(die=>die.isHeld)
    const firstValue=dice[0].value;
    const allSame=dice.every(die=>die.value)
    if(allHeld && allSame){
      setTenzies(true);
    }
  },[dice])


  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const diceElements = dice.map((item) => {
    return <Die 
    holdDice={holdDice}
    isHeld={item.isHeld}
    key={item.id} 
    value={item.value}
    id={item.id} />;
  });

  function roll() {
    if(tenzies){
      setDice(allNewDice())
      setTenzies(false)
    }
    else{

      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
        die :
        generateNewDie()
      }))
    }
  }

  function holdDice(id){
    setDice(prevState=>{
      return (prevState.map(item=>{
        if(item.id==id){
          return {...item,isHeld:!item.isHeld}
        }
        return item
      }))
    })
  }



  return (
    <>
      <main className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
        {diceElements}

        <button onClick={roll} className="border-0 rounded btn-roll">
          {tenzies? "New Game":"Roll"}
        </button>

        
      </main>
    </>
  );
}

export default App;
