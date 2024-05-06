import React from 'react';
import './App.css';
import Title from './components/Title/Title';
import Input from './components/Input/Input';
import SubmitButton from './components/Submit/submit';

export interface Creature {
  id: number;
  name: string;
  category: string;
  common_locations: string[];
  description: string;
  dlc: boolean;
  edible: boolean;
  cooking_effect: string;
  hearts_recovered: number;
  image: string;
}

export interface GuessCreature {
  Creature: Creature;
  correct: boolean;
}

interface ResponseData{
    data: Creature[];
}

function isResponseData(data: any): data is ResponseData {
    return Array.isArray(data.data);
}

export async function searchAllMonsters (){
    const request = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures");
    const response = await request.json();
    if (isResponseData(response)){
      return response.data;
    }
    else{
      throw new Error("Invalid data structure");
    }
}

async function fetchCreatures(): Promise<{creatures: Creature[], todaysCreature: Creature}>{

      const creatures: Creature[] = await searchAllMonsters();
      console.log(creatures);
      let todaysCreature = creatures[Math.floor(Math.random() * creatures.length)]
      return {creatures, todaysCreature};
}


async function App() {
  const {creatures, todaysCreature} = await fetchCreatures();

  return (
      <div className="background-container">
        <Title title='Monsters of Hyruledle'/>
        <SubmitButton/>
        <Input type='text' placeholder='bokoblin...' onChange={function (){}}/>
      </div>
  );
}

export default App;
