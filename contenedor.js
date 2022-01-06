const fs = require('fs')
/*CLASES*/
class producto{
    constructor(title,price,thumb) {
        this.id = 0;
        this.title = title; 
        this.price = price;  
        this.thumb = thumb;          
    }
}

class contenedor{
    constructor(fileName) {
        this.fileName = fileName;         
    }
    
    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(producto){  
        const nextID = () => {                              
            let fItems = JSON.parse( '[' + fs.readFileSync(this.fileName,'utf-8')    + ']')          
            if (fItems.length > 0) {                
                let items = fs.readFileSync(this.fileName,'utf-8')                                         
                return JSON.parse('[' + items + ']').length + 1                
            }else{
                return 1
            }           
        }         
  
        let data = ''   
        
        try {                  
            producto.id = nextID()   

            if (producto.id == 1)  
                data =  fs.appendFileSync(this.fileName ,JSON.stringify(producto)  , 'utf8')
            else
                data =  fs.appendFileSync(this.fileName ,'\n,' + JSON.stringify(producto)  , 'utf8')

            data =  producto.id                
        } catch (err) {
            data = 'No se puede abrir el archivo'      
        }

        return data  
    }
    

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(id){
        let data = null  
            
        try {
            let items = fs.readFileSync(this.fileName,'utf-8')
            let borrar = JSON.parse('[' + items + ']')
            if(borrar.filter(e => e.id == id) != 0)  data = borrar.filter(e => e.id == id)              
        } catch (err) {
            data = 'No se puede abrir el archivo'
        }
        
        return data  
    }

    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    getAll(){
        let data = ''   
        
        try {          
            let items =  '[' +  fs.readFileSync(this.fileName,'utf-8')   + ']'
            data = JSON.parse(items)
        } catch (err) {
            data = 'Esta vacio'
        }
        
        return data  
    }

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    deleteById(id){
        let data = null  
            
        try {
            let items = fs.readFileSync(this.fileName,'utf-8')
            items = '[' + items + ']'

            let borrar = JSON.parse(items)
            if(borrar.filter(e => e.id == id) != 0)  {               
               
                let newStr = ''    
                let items = borrar.filter(e => e.id != id)
                 
                let i = 0
                for (let item of items){      
                    i = i + 1 
                    newStr =  newStr + JSON.stringify(item) + '\n'
                    if ( i < items.length) newStr = newStr + ','    
                }                 
                fs.writeFileSync(this.fileName, newStr ,'utf-8')
                data = 'Borrado'
            }
        } catch (err) {
            data = 'No se puede abrir el archivo'
        }
        
        return data  
    }
    //deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    deleteAll(){
        let data = ''   
        
        try {
            fs.writeFileSync(this.fileName,'','utf-8')
            data = "Se borraron todos los registros"
        } catch (err) {
            data = 'No se puede abrir el archivo'
        }
        
        return data 
    }       
}
/*FIN CLASES*/
 
/*FUNCIONES*/
 
/*FIN FUNCIONES*/ 
console.log('/******************************************START***************************************************************/');
console.log('/**************************************************************************************************************/');
console.log('/Carga de productos/');
let file = new contenedor('./productos.txt') 

let item = new producto('Guitarra',999,'')
let id = file.save(item).then((val) => console.log(val));  
 
item = new producto('Bajo',888,'') 
id = file.save(item).then((val) => console.log(val)); 
 
item = new producto('Bateria',777,'')
id = file.save(item).then((val) => console.log(val)); 

item = new producto('Saxo',666,'')
id = file.save(item).then((val) => console.log(val)); 

console.log('/**************************************************************************************************************/');
console.log('/Lista todos los productos/');
console.log(file.getAll()); //OK

console.log('/**************************************************************************************************************/');
console.log('/get producto por id/');
console.log(file.getById(3)); //OK

console.log('/**************************************************************************************************************/');
console.log('/delete producto por id/');
console.log(file.deleteById(3)); //OK


console.log('/**************************************************************************************************************/');
console.log('/Lista todos los productos despues de borrar un item/');
console.log(file.getAll()); //OK

console.log('/**************************************************************************************************************/');
console.log('/borra todos los productos/');
console.log(file.deleteAll())


console.log('/**************************************************************************************************************/');
console.log('/Lista todos los productos despues de borrar todos/');
console.log(file.getAll()); //OK


console.log('/******************************************END*****************************************************************/');

