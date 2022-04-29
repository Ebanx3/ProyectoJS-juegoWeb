

//  FUnción para conseguir números random
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

const items = [
    {
        nombre: 'pocion menor',
        efecto: 20,
        precio: 10
    },
    {
        nombre: 'pocion',
        efecto: 35,
        precio: 15
    },{
        nombre: 'pocion mayor',
        efecto: 60,
        precio: 22
    },
    {
        nombre: 'espada Madera',
        efecto: 5,
        precio: 18
    },
    {
        nombre: 'espada Acero',
        efecto: 12,
        precio: 30
    },
    {
        nombre: 'Excalibur',
        efecto: 50,
        precio: 90
    }
]


let instruccion = '';
const instruccionesPosibles = [true,false,false,false]; //['continuar','huir','atacar','curar']
const textoJuego = document.getElementById('textoJuego');
const infoInstruccion = document.getElementById('mensajeInfo');
const registroHistorial = document.getElementById('registroHistorial');
const imgContenedor = document.getElementById('imgContenedor');
let PJ;
let indicacionAnterior = '';


//FUNCIÓN QUE LEE EL INPUT DEL USUARIO Y LO ASIGNA A LA VARIABLE "instruccion" O RECHAZA EN CASO DE ESTÁR VACÍO EL INPUT
const LeerInstruccion = () => {
    instruccion = document.getElementById('instruccionInput').value;
    document.getElementById('instruccionInput').value = '';
    if(instruccion != ''){
        comprobarInstruccion();
    } else {
        indicacionAnterior = infoInstruccion.innerHTML;
        MostrarIndicaciones('Debes ingresar una instrucción válida');
        setTimeout(()=>infoInstruccion.innerHTML= indicacionAnterior,1500); 
    }
}
document.getElementById('boton').onclick = function (e){
    e.preventDefault();
    LeerInstruccion();
};

//GESTIÓN DE PROGRESO Y ESCENAS DEL JUEGO
let progresoJuego = 0;
const escenas = [0,'nombrePJ','elegirNombre','intro','intro2','combate','historia','combate','tienda'];
const comprobarInstruccion = () =>{

    if(instruccion == 'continuar' && instruccionesPosibles[0] == 1 || progresoJuego == 1){
        Continuar()
    }
    else if(instruccion == 'huir' && instruccionesPosibles[1]){
        if(progresoJuego == 3){
            MostrarTexto('Huyes por donde viniste, demostrando ser un ser miserable ...')
        }

    }
    else if(instruccion == 'atacar' && instruccionesPosibles[2]){
        if(progresoJuego == 3){
            MostrarTexto('Intentas detener al orco para que el niño consiga huir...');
            setTimeout(escenaPrimerCombate,3000);
        }
    }
    else if(instruccion == 'curar' && instruccionesPosibles[3]){
        //curar
    }
    else if(instruccion == 'inventario'){

    }
    else if(instruccion == 'terminar'){

    }
    else{
        indicacionAnterior = infoInstruccion.innerHTML;
        MostrarIndicaciones('Debes ingresar una instrucción válida');
        setTimeout(()=>infoInstruccion.innerHTML= indicacionAnterior,1500); 
    }

}
const Continuar = () =>{
    progresoJuego++;

    if(escenas[progresoJuego] == 'nombrePJ'){
        escenanombrePJ();
    }
    else if(escenas[progresoJuego] == 'elegirNombre'){
        PJ = new Personaje(instruccion);
        escenaIntro();

    }
    else if(escenas[progresoJuego] == 'intro'){
        escenaIntro2()
    }
    else if(escenas[progresoJuego] == 'intro2'){
        escenaPrimerCombate();
    }
}


//FUNCIONES PARA MODIFICAR U OCULTAR TEXTO EN LA VENTANA DEL JUEGO O INDICACIONES SOBRE EL COMANDO
const MostrarIndicaciones = (Indicaciones) => infoInstruccion.innerHTML= Indicaciones;
const OcultarIndicaciones = () => infoInstruccion.innerHTML = '';
const MostrarTexto = (texto) => textoJuego.innerHTML = texto;
const OcultarTexto = () => textoJuego.innerHTML = '';
const MostrarImg = (pathImg) => {
    const img = document.createElement('img');
    img.setAttribute('src', pathImg);
    img.setAttribute('width','300px')
    imgContenedor.setAttribute('class','dispBlock');
    imgContenedor.appendChild(img);
}

//OBTENER ITEMS, AGREGA AL INVENTARIO Y MUESTRA EN EL HISTORIAL EL REGISTRO DEL OBJETO Y CANTIDAD OBTENIDO
const ObtenerItem=(obj, cant)=>{
    PJ.AgregarItemInventario(obj,cant);
    const strRegistro = `Obtienes ${obj.nombre} x ${cant}`;
    AgregarRegistroHistorial(strRegistro);
}

const AgregarRegistroHistorial = (string) =>{
    let elemRegistro = document.createElement('p');
    elemRegistro.innerHTML = string;
    elemRegistro.setAttribute('class','elementoRegistro');
    registroHistorial.append(elemRegistro);
    elemRegistro.scrollIntoView({behavior:"smooth"});
}

//ESCENA PARA ESCOGER NOMBRE DE PJ
const escenanombrePJ = () =>{
    MostrarTexto('Escoge un nombre para tu personaje');
    OcultarIndicaciones();
}

//ESCENA INTRO
const introTexto = 'Te descubres junto a un árbol, en medio de una planicie.<br><br> A menos de un metro de distancia, un bolso de cuero marrón, lo tomás y ves que tiene algunas pociones dentro <br><br> Miras a tu alrededor y ves un bosque a pocos minutos,  tienes algo de hambre y te parece buena idea ir ahí a buscar alguna fruta o baya mientras piensas que hacer después...';
const escenaIntro = () => {
      
    MostrarTexto(introTexto);
    ObtenerItem(items[0],5);
    console.log(PJ)    
    MostrarIndicaciones('Ingresa continuar')
} 

//
const intro2Texto = 'Despues de haber caminado unos minutos por el bosque encuentras un árbol de frutas, decides tomar algunas y sentarte.<br><br>Apenas le das un primer mordisco ... escuchas a lo lejos un grito<br>Miras fijamente y notas a un niño corriendo en  dirección a donde tu estás y un instante despupés ves que lo sigue un orco<br><br><br>Que piensas hacer?'
const escenaIntro2 = () => {
    MostrarTexto(intro2Texto);
    MostrarIndicaciones('Ingresa atacar o huir');
    instruccionesPosibles[0]=false;
    instruccionesPosibles[1]=true;
    instruccionesPosibles[2]=true;
    instruccionesPosibles[3]=false;
}

const escenaPrimerCombate= () =>{
    MostrarImg('./img/orco.png');
    MostrarTexto('Te enfrentas al orco');
    instruccionesPosibles[0]=false;
    instruccionesPosibles[1]=true;
    instruccionesPosibles[2]=true;
    instruccionesPosibles[3]=true;
}