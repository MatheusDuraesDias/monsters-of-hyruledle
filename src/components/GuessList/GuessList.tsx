import React from 'react';
import { Creature, GuessCreature } from '../../App';
import './GuessList.css';

interface GuessListProps {
  guessedMonsters: GuessCreature[];
}

const GuessListItem: React.FC<{ guess: GuessCreature, rightGuess: Creature}> = ({ guess, rightGuess }) => {
    const { Creature, correct } = guess;

    const hasCommonLocation = Creature.common_locations.some(location => rightGuess.common_locations.includes(location));

    return (
        <div className={`list-item`}>
            <div className="img-container attributes">
                <img src={Creature.image} alt={Creature.name} />
            </div>
            <p className={Creature.name == rightGuess.name ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.name}</p>
            <p className={Creature.category == rightGuess.category ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.category}</p>
            <ul className={Creature.common_locations == rightGuess.common_locations ? "correct-guess attributes": hasCommonLocation ? "mid-guess attributes" : "wrong-guess attributes"}>
                {Creature.common_locations.map((location, index) => (
                    <li key={index}>{location}</li>
                ))}
            </ul>
            <p className={Creature.dlc == rightGuess.dlc ? "correct-guess attributes" : "wrong-guess attributes"}>{Creature.dlc ? "yes" : "no"}</p>
            <p className={Creature.edible == rightGuess.edible ? "correct-guess attributes" : "wrong-guess attributes"}>{Creature.edible ? "yes" : "no"}</p>
            <p className={
                rightGuess.edible ?
                    Creature.edible ?
                        Creature.cooking_effect == rightGuess.cooking_effect ? "correct-guess attributes" : "wrong-guess attributes"
                        : rightGuess.cooking_effect == "" ? "correct-guess attributes" : "wrong-guess attributes"
                    : Creature.edible ?
                        Creature.cooking_effect == "" ? "correct-guess attributes" : "wrong-guess attributes"
                        : "correct-guess attributes"
            }>{Creature.edible ? Creature.cooking_effect : "none"}</p>
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
      <div className='list-container'>
          <div className='list-item attributes-names list-container'>
              <p className='attributes'>Image</p>
              <p className='attributes'>Name</p>
              <p className='attributes'>Category</p>
              <div className='attributes'>
                  <p>Common </p>
                  <p>Locations</p>
              </div>              <p className='attributes'>DLC?</p>
              <p className='attributes'>Edible?</p>
              <div className='attributes'>
                  <p>Cooking </p>
                  <p>Effect</p>
              </div>
              <div className='attributes'>
                  <p>Hearts </p>
                  <p>Recovered</p>
              </div>
          </div>
        {guessedMonsters.map((guessCreature, index) => (
          <GuessListItem key={index} guess={guessCreature} rightGuess={rightGuess} />
        ))}
      </div>
  );
};

export default GuessList;

