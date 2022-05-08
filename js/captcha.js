"use strict";
//llamo al boton
document.querySelector("#btnEnviar").addEventListener("click",comprobrarCaptcha);

let random= Math.floor(Math.random()*5)
MostrarImg();

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

function comprobrarCaptcha(){
    event.preventDefault();
    let numIngresado= document.querySelector("#respuestaIngresada").value;
    if(numIngresado==random){
        document.querySelector("#resultado").innerHTML="Correcto, Registro valido";
        document.querySelector("#estilocaptcha").classList.add("verificado");
        document.querySelector("#estilocaptcha").classList.remove("error");
    }
    else{
        document.querySelector("#resultado").innerHTML="Incorrecto, vuelva a intentarlo"
        document.querySelector("#estilocaptcha").classList.add("error");
        document.querySelector("#estilocaptcha").classList.remove("verificado");
    }
}
