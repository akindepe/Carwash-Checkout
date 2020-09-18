module.exports= class Employee{
   constructor(){
       if(this.constructor == Employee){
           throw new Error('Fehler');
       }
   }
   getLastName(){
       throw new Error("Fehler");
   }
   getId(){
       throw new Error("Fehler");
   }
   

}

