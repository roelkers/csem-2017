const express = require('express');
const router = express.Router();
const MULTIPLIER = 50;
let pokemon = [
  { name: 'Charmander', strength: 70 },
  { name: 'Rattata', strength: 45 },
  { name: 'Pikachu', strength: 60 },
];

// TODO: Middleware function #1.
// Create two random numbers, each
// between 0 and 20.
// Assign the two numbers to the request object
// property 'randomStrength'.

router.use('/',(req,res,next) =>{
  console.log('middleware function giving strength to both pokemon');
  req.randomStrength = {};
  pokemon.forEach((p)=>{
    req.randomStrength[p.name] =  Math.floor(Math.random()*MULTIPLIER);
  })
  next();
})

// Middleware function #2.
// Log on console who is fighting against whom.
router.use('/:p1/vs/:p2', (req, res, next) => {
  console.log(`The fight is on between ${req.params.p1} and ${req.params.p2}.`);
  next();
});

// TODO: POST request handler that performs the fight
// by comparing the pokemon's strength + their
// respective 'randomStrength'.
// Return winner and loser in the response.
router.post('/:p1/vs/:p2', (req, res) => {
  function buffPokemon(pokemonName){
    let fightingPokemon = pokemon.find((p)=>{
      return p.name==pokemonName
    });
    fightingPokemon.strength += req.randomStrength[pokemonName];
    console.log(`Making ${fightingPokemon.name} stronger.`);
    console.log(`${fightingPokemon.name} has now a strength of ${fightingPokemon.strength}.`);
    return fightingPokemon;
  }
  function pokeFight(p1,p2){
    if(p1.strength > p2.strength)
      return p1;
    if (p1.strength < p2.strength)
      return p2;
    return null;
  }
  let p1 = buffPokemon(req.params.p1);
  let p2 = buffPokemon(req.params.p2);
  let winningPokemon = pokeFight(p1,p2);
  if(winningPokemon== null)
    console.log(`Both pokemon are equally strong. They both win!`)
  console.log(`${winningPokemon.name} wins the fight!`)
  res.end(`<h1>${winningPokemon.name} wins the fight!<h1>`);
});

module.exports = router;
