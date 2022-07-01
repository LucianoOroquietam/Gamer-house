document.addEventListener("DOMContentLoaded",loadPage);

function loadPage(){


    
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
                <td><a href="#form"><button class="editar" data-element-id="${elemento.id}">Editar</button></a><button class="confirmar" data-element-id="${elemento.id}">Confirmar</button></td>
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

        let id= this.dataset.elementId;
        try{
            let response = await fetch(`${url}/${id}`,{
                "method":"GET"
            })
            let usuario= await response.json();
            document.querySelector("#nombre").value=usuario.nombre;
            document.querySelector("#mail").value=usuario.mail;
            document.querySelector("#numero").value=usuario.numero;
            document.querySelector("#pass").value=usuario.password;
            //esta bien usar el value? ya usamos el formdata para obtener los datos
        }catch(error){
            //msj html
        }
        let btnConfirmar= tabla.querySelectorAll(".confirmar");
        btnConfirmar.forEach(e=> e.addEventListener("click",confirmarEdicion));

    }



    async function confirmarEdicion(){

        let id= this.dataset.elementId;

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

            let response= await fetch(`${url}/${id}`,{
                "method":"PUT",
                "headers":{"Content-type":"application/json"},
                "body":JSON.stringify(datosUsuario)
            })
            

        }
        catch(error){
            //msj html
        }

        mostrarTabla()



    }






}