document.addEventListener("DOMContentLoaded",loadPage);

function loadPage(){

    const statusError=document.querySelector(".statusError");
    const modal= document.querySelector(".modal");
    const form=document.querySelector("#form");
    form.addEventListener("submit",enviarDatos);
    const tabla=document.querySelector("#tablaForm");
    const url ="https://62b60d376999cce2e8fe6127.mockapi.io/persona"
    document.querySelector("#agregarTres").addEventListener("click",agregarTres);
    mostrarTabla()


    async function mostrarTabla(){


        try{

            

            let response= await fetch(url,{
                "method":"GET",
            })
            let usuario= await response.json();
            tabla.innerHTML="Loading..."


            tabla.innerHTML= `<thead>
            <tr>
                <th>Nombre Usuario</th>
                <th>Email</th>
                <th>Numero de Telefono</th>
                <th>Contraseña</th>
                <th>Editar</th>
                <th>Borrar</th>
            </tr>

          </thead>`
            usuario.forEach(elemento => {
                tabla.innerHTML+= `<tr>
                <td>${elemento.nombre}</td>
                <td>${elemento.mail}</td>
                <td>${elemento.numero}</td>
                <td>${elemento.password}</td>
                <td><button class="editar" data-element-id="${elemento.id}">Editar</button></td>
                <td><button class="borrar" data-element-id="${elemento.id}">Borrar</button></td>
                </tr>`
            })

            let btnEditar= tabla.querySelectorAll(".editar");
            btnEditar.forEach(e => e.addEventListener("click",editar));

            let btnBorrar= tabla.querySelectorAll(".borrar");
            btnBorrar.forEach(e=> e.addEventListener("click",borrar));

            
        }
        catch(error){
            let mensaje = 'mostrar la tabla';
            mensajeError(mensaje);
        }

    }

    async function enviarDatos(event){
        event.preventDefault();

        let formdata= new FormData(form);
        let nombre=formdata.get('name');
        let email=formdata.get('mail');
        let numero=formdata.get('numero');
        let contraseña=formdata.get('pass')
        form.reset();
        let datosUsuario={

            "nombre":nombre,
            "mail":email,
            "numero":numero,
            "password":contraseña

        }

        try{

            let response= await fetch(url,{
                "method":"POST",
                "headers":{"Content-type":"application/json"},
                "body":JSON.stringify(datosUsuario)
            })

            if(response.status==201){
                mostrarTabla()
            }


        }
        catch(error){
            let mensaje = 'enviar datos';
            mensajeError(mensaje);
        }

    }

    async function borrar(){

        let id= this.dataset.elementId;
        try{
            
            let response= await fetch(`${url}/${id}`,{
                "method":"DELETE"
            })



            if(response.status===200){
                mostrarTabla();
            }

        }


        catch(error){

            let mensaje = 'borrar';
            mensajeError(mensaje);
        }
        

    }


    async function editar(){

        modal.classList.remove("hide");
        let id= this.dataset.elementId;
        try{
            let response = await fetch(`${url}/${id}`,{
                "method":"GET"
            })
            let usuario= await response.json();
            
            
            modal.innerHTML=`  <form id="formEditado">
                                <fieldset>
                                <label>Nombre</label> 
                                <input id="nombre" name="nombre" type="text" value="${usuario.nombre}">
                                <label>Mail</label> 
                                <input id="mail" name="mail" type="text" value="${usuario.mail}">
                                <label>Telefono</label> 
                                <input id="numero" name="numero" type="text" value="${usuario.numero}">
                                <label>Contraseña</label> 
                                <input id="pass" name="pass" type="text" value="${usuario.password}">
                                <button data-element-id="${id}" class="guardar">guardar</button>
                                </fieldset> 
                               </form>`
            let guardar= document.querySelectorAll(".guardar");
            guardar.forEach(e=>e.addEventListener("click",guardarEdicion))
          
            

        }catch(error){
            let mensaje = 'obtener los datos para la edicion';
            mensajeError(mensaje);
        }

    }
    
    async function guardarEdicion(event){
        event.preventDefault()
        let id= this.dataset.elementId;
            
  
        
        let formEditado= modal.querySelector("#formEditado");
        let formdata= new FormData(formEditado);
        let nombre=formdata.get('nombre');
        let email=formdata.get('mail');
        let numero=formdata.get('numero');
        let contraseña=formdata.get('pass');
        formEditado.reset();
        let datosUsuario={

            "nombre":nombre,
            "mail":email,
            "numero":numero,
            "password":contraseña

        }
        
        
        try{

            let response= await fetch(`${url}/${id}`,{
                "method":"PUT",
                "headers":{"Content-type":"application/json"},
                "body":JSON.stringify(datosUsuario)
            })
            


            if(response.status===200){
                mostrarTabla();
            }
        }


        catch(error){
            let mensaje = 'editar';
            mensajeError(mensaje);

        }

        modal.classList.add("hide");

    

    }



    async function agregarTres(){

        let tresUsuarios={}
        
        let numero=0
        while(numero<3){
        try{

                    let response= await fetch(url,{
                        "method":"POST",
                        "headers":{"Content-type":"application/json"},
                        "body":JSON.stringify(tresUsuarios)
                    })

                    if(response.status===201){
                        mostrarTabla();
                    }
        }
                catch(error){
                    let mensaje = 'agregar 3 Usuarios';
                    mensajeError(mensaje);
                    
                }
                numero++;
    }
        
    }



    function mensajeError(error){
        statusError.classList.remove("hide");
       
        
        statusError.innerHTML= `<h1>ERROR!! Fallo al ${error} </h1> `
        setTimeout(()=>{

            statusError.classList.add("hide");

        }, 3000)
       
    }

}