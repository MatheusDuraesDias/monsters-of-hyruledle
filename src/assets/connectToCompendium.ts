import { promises } from "dns"

// export async function searchAllMonsters (){
//     return fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures")
//     .then(res => {
//         if (!res.ok){
//             throw new Error("Failed to fetch data from the AP (compendiu API) :(")
//         }
//         else{
//             return res
//         }
//     })
//     .then(res => res.json())
//     .then(json => {return json.data})
//     .catch(err => console.error(err))
// }

// export async function searchAllMonsters() {
//     try {
//         const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures");
//         if (!response.ok) {
//             throw new Error("Failed to fetch data from the API :(");
//         }
//         const json = await response.json();
//         return json.data;
//     } catch (err) {
//         console.error(err);
//         return [];
//     }
// }

// let Creatures = await searchAllMonsters()

// let todaysCreature = Creatures[Math.floor(Math.random() * Creatures.length)]