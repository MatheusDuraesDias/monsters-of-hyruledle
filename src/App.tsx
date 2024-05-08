import React, { useState, useEffect } from 'react';
import './App.css';
import Title from './components/Title/Title';
import SubmitButton from './components/Submit/submit';
import GuessList from './components/GuessList/GuessList';

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

interface ResponseData {
  data: Creature[];
}

function isResponseData(data: any): data is ResponseData {
  return Array.isArray(data.data);
}

async function searchAllMonsters(setCreature: React.Dispatch<React.SetStateAction<Creature[]>>) {
  const request = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures");
  const response = await request.json();
  if (isResponseData(response)) {
    setCreature(response.data);
  } else {
    throw new Error("Invalid data structure");
  }
}

function fetchCreatures(creatures: Creature[]): { todaysCreature: Creature } {
  let todaysCreature = creatures[Math.floor(Math.random() * creatures.length)];
  return { todaysCreature };
}

function App() {
  const [creatures, setCreature] = useState<Creature[]>([]);
  const [todaysCreature, setTodaysCreature] = useState<Creature | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await searchAllMonsters(setCreature);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (creatures.length > 0) {
      const { todaysCreature } = fetchCreatures(creatures);
      setTodaysCreature(todaysCreature);
    }
  }, [creatures]);

  //guess mocks
  const someGuesses = [
    {
      Creature: {
        id: 3,
        name: 'Right Monster',
        category: 'Right Category',
        common_locations: ['Right Location', "among us", "among uk", "make it wrong", "make it wrong", "make it wrong"],
        description: 'Description of the right monster',
        dlc: true,
        edible: true,
        cooking_effect: 'Right Cooking Effect',
        hearts_recovered: 5,
        image: 'https://botw-compendium.herokuapp.com/api/v3/compendium/entry/bladed_rhino_beetle/image',
      },
      correct: false
    },
    {
      Creature: {
        id: 3,
        name: 'Right Monster',
        category: 'Right Category',
        common_locations: ['Right Location'],
        description: 'Description of the right monster',
        dlc: true,
        edible: true,
        cooking_effect: 'Right Cooking Effect',
        hearts_recovered: 5,
        image: 'https://botw-compendium.herokuapp.com/api/v3/compendium/entry/bladed_rhino_beetle/image',
      },
      correct: false
    }
  ];

  if (todaysCreature!= null){
    someGuesses.push({Creature: 
      todaysCreature,
    correct: false })
  }

  return (
    <div className="background-container">
      <Title title='Monsters of Hyruledle' />
      <SubmitButton />
      {todaysCreature != null ? <GuessList guessedMonsters={someGuesses} rightGuess={todaysCreature}></GuessList>: ""}
    </div>
  );
}

export default App;
