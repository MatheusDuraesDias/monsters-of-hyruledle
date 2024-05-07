import React from 'react';
import { Creature, GuessCreature } from '../../App';
import './GuessList.css';

interface GuessListProps {
  guessedMonsters: GuessCreature[];
}

const GuessListItem: React.FC<{ guess: GuessCreature, rightGuess: Creature}> = ({ guess, rightGuess }) => {
    const { Creature, correct } = guess;

    const [location, setLocation] = React.useState<number[]>([]);

    const verifyLocations = (): number => {

        var igual = true
        var temLocation = 0

        Creature.common_locations.forEach(location => {
            if(rightGuess.common_locations.includes(location)){
                temLocation = 1
            }
        })

        if(Creature.common_locations.length >= rightGuess.common_locations.length){
            Creature.common_locations.forEach(location => { 
                if (!rightGuess.common_locations.includes(location)) {
                    igual = false
                }
            })
        } else {
            rightGuess.common_locations.forEach(location => { 
                if (!Creature.common_locations.includes(location)) {
                    igual = false
                }
            })
        }
        

        if(temLocation == 1 && !igual) {
            temLocation = 1
        }

        if(igual) {
            temLocation = 2
        }

        return temLocation
    }

    return (
        <div className={`list-item`}>
            <div className="img-container attributes">
                <img src={Creature.image} alt={Creature.name} />
            </div>
            <p className={Creature.name == rightGuess.name ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.name}</p>
            <p className={Creature.category == rightGuess.category ? "correct-guess attributes": "wrong-guess attributes"}>{Creature.category}</p>
            <ul className={
                verifyLocations() === 2 ? "correct-guess attributes": verifyLocations() === 1 ? "mid-guess attributes" : "wrong-guess attributes"}>
                {Creature.common_locations.map((location, index) => (
                    <li key={index}>{location}</li>
                ))}
            </ul>
            <p className={Creature.dlc == rightGuess.dlc ? "correct-guess attributes" : "wrong-guess attributes"}>{Creature.dlc ? "yes" : "no"}</p>
            {/* <p className={Creature.edible == rightGuess.edible ? "correct-guess attributes" : "wrong-guess attributes"}>{Creature.edible ? "yes" : "no"}</p> */}
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
              <p className='title'>Image</p>
              <p className='title'>Name</p>
              <p className='title'>Category</p>
              <div className='title'>
                  <p>Common </p>
                  <p>Locations</p>
              </div>              <p className='title'>DLC?</p>
              {/* <p className='title'>Edible?</p> */}
              <div className='title'>
                  <p>Cooking </p>
                  <p>Effect</p>
              </div>
              <div className='title'>
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

