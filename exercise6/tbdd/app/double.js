module.exports = (input) => {   
    return new Promise((resolve, reject) => {       
        setTimeout(() => {         
            console.log('double() log: input is ', input);         
            resolve(input * 2);       
        }, 500);     
    }); 
};
