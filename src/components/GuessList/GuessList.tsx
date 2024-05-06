import React from 'react';
import { Creature, GuessCreature } from '../../App';
import './GuessList.css';

// export interface Creature {
//   id: number;
//   name: string;
//   category: string;
//   common_locations: string[];
//   description: string;
//   dlc: boolean;
//   edible: boolean;
//   cooking_effect: string;
//   hearts_recovered: number;
//   image: string;
//   correct: boolean;
// }

interface GuessListProps {
  guessedMonsters: GuessCreature[];
}

const GuessListItem: React.FC<{ guess: GuessCreature, rightGuess: Creature}> = ({ guess, rightGuess }) => {
    const { Creature, correct } = guess;

    const hasCommonLocation = Creature.common_locations.some(location => rightGuess.common_locations.includes(location));

    return (
        <div className={correct ? "list correct-guess attributes": "list wrong-guess attributes"}>
            <img src={Creature.image} alt={Creature.name} style={{ maxWidth: '80px', maxHeight: '80px' }}/>
            <p className={Creature.name == rightGuess.name ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.name}</p>
            <p className={Creature.category == rightGuess.category ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.category}</p>
            <ul className={Creature.common_locations == rightGuess.common_locations ? "correct-guess attributes": hasCommonLocation ? "mid-guess attributes" : "wrong-guess attributes"}>
                {Creature.common_locations.map((location, index) => (
                    <li key={index}>{location}</li>
                ))}
            </ul>
            <p className={Creature.dlc == rightGuess.dlc ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.dlc}</p>
            <p className={Creature.edible == rightGuess.edible ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.edible}</p>
            <p className={Creature.cooking_effect == rightGuess.cooking_effect ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.cooking_effect}</p>
            <p className={
                rightGuess.edible ? 
                    Creature.edible?
                        Creature.hearts_recovered == rightGuess.hearts_recovered ? "correct-guess attributes" : "wrong-guess attributes"
                    : rightGuess.hearts_recovered == 0 ? "correct-guess attributes" : "wrong-guess attributes"
                : Creature.edible?
                    Creature.hearts_recovered == 0 ? "correct-guess attributes" : "wrong-guess attributes"
                : "correct-guess attributes"
            }>{Creature.edible ? Creature.hearts_recovered : 0}</p>
    </div>
  );
};

const GuessList: React.FC<{guessedMonsters: GuessCreature[], rightGuess: Creature}> = ({ guessedMonsters, rightGuess }) => {
  return (
    <div>
      <div>
        <p>Name</p>
        <p>Height</p>
        <p>Weapon</p>
        {/* Add more labels for other monster attributes */}
      </div>
      <div>
        {guessedMonsters.map((guessCreature, index) => (
          <GuessListItem key={index} guess={guessCreature} rightGuess={rightGuess} />
        ))}
      </div>
    </div>
  );
};

export default GuessList;

