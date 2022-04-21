

//  FUnción para conseguir números random
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//Clase PJ
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

//Variable que irá recibiendo los inputs del jugador
let instruccion = '';
let indicaciones = ['continuar'];
const textoJuego = document.getElementById('textoJuego');
const infoInstruccion = document.getElementById('mensajeInfo')
let nombrePJ;
//Función que lee y asigna en instruccion el valor del input
function LeerInstruccion(){
    instruccion = document.getElementById('instruccionInput').value;
    document.getElementById('instruccionInput').value = '';
    if(instruccion != ''){
        comprobarInstruccion();
    }
}

function comprobarInstruccion(){
    if(instruccion.toLowerCase() == indicaciones[0])
        Continuar();
    else{
        MostrarIndicaciones('Instrucción no válida');
        setTimeout(OcultarIndicaciones(),3000);
    }
}

let progresoJuego = 0;
const escenas = [0, 'nombrePJ', 'elegirNombre','intro','combate','historia', 'combate','tienda'];
function Continuar(){
    progresoJuego++;
    if (escenas[progresoJuego] == 'nombrePJ'){
        escenanombrePJ();
    }
    else if (escenas[progresoJuego] == 'elegirNombre'){
        nombrePJ=instruccion;
    }
}



function MostrarIndicaciones(Indicaciones){
    infoInstruccion.innerHTML= Indicaciones;
}

function OcultarIndicaciones(){
    infoInstruccion.innerHTML = '';
}

document.getElementById('boton').onclick = function (){
    LeerInstruccion();
};


function MostrarTexto(texto){
    textoJuego.innerHTML = texto;
}
function OcultarTexto(){
    textoJuego.innerHTML = '';
}

MostrarTexto('Proyeco para el curso de JavaScript de CoderHouse <br><br> Juego de combates por turnos <br><br>github.com/Ebanx3');
MostrarIndicaciones('Ingresa continuar...');

function escenanombrePJ(){
    MostrarTexto('Escoge un nombre para tu personaje');
    MostrarIndicaciones('Ingresa el nombre de tu personaje');
}

