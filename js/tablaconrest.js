document.addEventListener("DOMContentLoaded",loadPage);

function loadPage(){


    const modal= document.querySelector(".modal");
    const form=document.querySelector("#form");
    form.addEventListener("submit",enviarDatos);
    const tabla=document.querySelector("#tablaForm");
    const url ="https://62b60d376999cce2e8fe6127.mockapi.io/persona"

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
            console.log(error)//agregar en html un msj
        }

    }

    async function enviarDatos(){
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
            //msj html
        }

    }

    async function borrar(){

        let id= this.dataset.elementId;
        try{
            
            let response= await fetch(`${url}/${id}`,{
                "method":"DELETE"
            })

        }
        catch(error){

            console.log(error)//msj html
        }
        mostrarTabla();

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
                                <input id="nombre" name="nombre" type="text">
                                <label>Mail</label> 
                                <input id="mail" name="mail" type="text">
                                <label>Telefono</label> 
                                <input id="numero" name="numero" type="text">
                                <label>Contraseña</label> 
                                <input id="pass" name="pass" type="text">
                                <button data-element-id="${id}" class="guardar">guardar</button>
                                </fieldset> 
                               </form>`
            let guardar= document.querySelectorAll(".guardar");
            guardar.forEach(e=>e.addEventListener("click",guardarEdicion))
            modal.querySelector("#nombre").value=usuario.nombre;
            modal.querySelector("#mail").value=usuario.mail;
            modal.querySelector("#numero").value=usuario.numero;
            modal.querySelector("#pass").value=usuario.password;
            

        }catch(error){
            //msj html
        }

    }
    
    async function guardarEdicion(){
        event.preventDefault()
        let id= this.dataset.elementId;
            console.log(id)
  
        
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
        console.log(datosUsuario)
        
        try{

            let response= await fetch(`${url}/${id}`,{
                "method":"PUT",
                "headers":{"Content-type":"application/json"},
                "body":JSON.stringify(datosUsuario)
            })
            

        }
        catch(error){
            //msj html
        }

        modal.classList.add("hide");

        mostrarTabla()
    

    }






}