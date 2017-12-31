module.exports = class Hotel {
    constructor(name) {
        this.name = name;
    }

    save() {   
        // Calling the database
        return new Promise((resolve, reject) => {       
            setTimeout(() => {     
                if (randomError()) {
                    reject('database error'); 
                } 
                else {
                    resolve('saved'); 
                }            
            }, 250);     
        }); 
    }
}

function randomError() {
    if (Math.random() > 0.5) {
        return 'A random error occured';
    } else {
        return null;
    }
}
