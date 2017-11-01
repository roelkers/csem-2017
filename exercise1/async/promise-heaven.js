// A "helper" function that creates
// some non-deterministic behavior
function randomError() {
  if (Math.random() > 0.7) {
    return 'A random error occured';
  } else {
    return null;
  }
}
/*
let welcome = new Promise(function(resolve,reject){
  let err = randomError();
  if(err)
    reject('Oh no!'+err);
  else resolve();
})
let to = new Promise(function(resolve,reject){
  let err = randomError();
  if(err)
    reject('Wut?'+err);
  else resolve();
})
let paradise = new Promise(function(resolve,reject){
  let err = randomError();
  if(err)
    reject('Srsly?'+err);
  else resolve('Welcome to paradise ☁☁');
})
*/
let welcome = function(){
  let promise = new Promise(function(resolve,reject){
    let err = randomError();
    if(err)
      reject('Oh no!'+err);
    else resolve('Welcome');
  });
  return promise;
}

let to = function(res){
  let promise = new Promise(function(resolve,reject){
    let err = randomError();
    if(err)
      reject('Wut?'+err);
    else resolve(res+' to');
  });
  return promise;
}

let paradise = function(res){
  let promise = new Promise(function(resolve,reject){
    let err = randomError();
    if(err)
      reject('Srsly?!'+err);
    else resolve(res+' paradise ☁☁');
  });
  return promise;
}


// TODO: write the three missing Promises and assign them to the variables
// "welcome", "to", and "paradise"

welcome().then(to).then(paradise).then(data => console.log(data)).catch(err => console.error(err));

// Example outputs:
// Srsly? A random error occured
// Welcome to paradise ☁☁
// Wut? A random error occured
