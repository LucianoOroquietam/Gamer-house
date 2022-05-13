"use strict";

//llamo al boton
document.querySelector("#btnEnviar").addEventListener("click",comprobrarCaptcha);

//variable contenedora de un random
let random= Math.floor(Math.random()*5) 

//funcion que me genera el random
function MostrarImg(){
   switch(random){
       case 0:{
        document.querySelector("#imgCaptcha").src="img/captcha/resultado0.jpg"
        break;
       }
       case 1:{
        document.querySelector("#imgCaptcha").src="img/captcha/resultado1.jpg"
        break;
       }
       case 2:{
        document.querySelector("#imgCaptcha").src="img/captcha/resultado2.jpg"
        break;
       }
       case 3:{
        document.querySelector("#imgCaptcha").src="img/captcha/resultado3.jpg"
        break;
       }
       case 4:{
        document.querySelector("#imgCaptcha").src="img/captcha/resultado4.jpg"
        break;
       }
      
   }
}

//llamo a la funcion para que se muestre una imagen por pantalla al cargar el dom
MostrarImg();


//verifico lo que ingresa el usuario
function comprobrarCaptcha(event){
    event.preventDefault();
    let numIngresado= document.querySelector("#respuestaIngresada").value;
    
    if(numIngresado==random){
        document.querySelector("#resultado").innerHTML="Correcto, Registro valido";
        document.querySelector("#estilocaptcha").classList.add("verificado");
        document.querySelector("#estilocaptcha").classList.remove("error");
        document.querySelector("#verificado-incorrecto").classList.add("mostrarimagen");
        document.querySelector("#verificado-incorrecto").src="img/captcha/verficiado.svg";
    }
    else{
        document.querySelector("#resultado").innerHTML="Incorrecto, vuelva a intentarlo"
        document.querySelector("#estilocaptcha").classList.add("error");
        document.querySelector("#estilocaptcha").classList.remove("verificado");
        document.querySelector("#verificado-incorrecto").classList.add("mostrarimagen");
        document.querySelector("#verificado-incorrecto").src="img/captcha/error.svg";
    }
}
