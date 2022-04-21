function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

class Personaje{
    constructor(nombre){
        this.nombre = nombre;
        this.lvl = 1;
        this.hp = 50;
        this.actualHp = 50;
        this.dmg = 10;
        this.def = 1;
        this.vivo = true;
        this.inventario = [{
            nombre: 'pocionMenor',
            efecto: 20,
            precio: 10,
            cantidad: 5
        }]
    }
    
    Atacar(){
        const num = random(1,3)/2;
        return this.dmg * num;
    }

    Cubrirse(){
        this.def = 2;
    }

    RecibirDanio(cant){
        let valor = Math.trunc(cant/this.def);
        this.actualHp -= valor;
        if(this.actualHp <= 0){
            this.vivo = false; 
        }
        if(this.def==2){
            this.def = 1;
        }
        return Math.trunc(valor);
    }

    ItemsInventario(objNombre){
        //Retorna la cantidad de un objeto que hay en el inventario
        const indice = this.inventario.findIndex(element => element.nombre == objNombre);
        if (indice == -1){
            return 0;
        }
        else{
            return this.inventario[indice].cantidad;
        }
    }

    PocionesInventario(){
        const pocMn = this.ItemsInventario('pocionMenor') ;
        const poc = this.ItemsInventario('pocion');
        const pocMy = this.ItemsInventario('pocionMayor');
        if (pocMn + poc + pocMy == 0){
            return 'No tienes pociones en el inventario';
        }
        else{
            let cantidadPociones = 'Tienes ';
            if (pocMn != 0){
                cantidadPociones = cantidadPociones + pocMn + ' pociones menores '; 
            }
            if (poc != 0){
                cantidadPociones = cantidadPociones + poc + ' pociones ';
            }
            if (pocMy != 0){
                cantidadPociones = cantidadPociones + pocMy + ' pociones mayores';
            }
            return cantidadPociones;
        }
        
    }

    Curar(){
        
        this.inventario = 
        this.actualHp += cant;
        if(this.actualHp > this.hp){
            this.actualHp = this.hp;
        }
    }

    SubirNivel(){
        this.lvl++;
        this.hp += 5;
        this.dmg += 2;
    }

    NormalizarDef(){
        this.def = 1;
    }

    AgregarItemInventario(item){
        const ind = this.inventario.findIndex(elem => elem.nombre == item.nombre);
        if (ind == -1){
            this.inventario.push(item);
            this.inventario[this.inventario.length - 1].cantidad = 1;
        }
        else{
            this.inventario[ind].cantidad ++;
        }
    }

    QuitarItemInventario(nombre){
        console.log(this.inventario);
        console.log('item que quiero eliminar ',nombre);
        const indice = this.inventario.findIndex(element => element.nombre == nombre);
        if (indice >= 0){
            if (this.inventario[indice].cantidad > 1){
                this.inventario[indice].cantidad --;
            }
            else if (this.inventario[indice].cantidad == 1){
                this.inventario.splice(indice, 1);
            }
        }    
        console.log(this.inventario);
    }
}

export {Personaje}