document.addEventListener("DOMContentLoaded",loadPage);


function loadPage(){

    let form=document.querySelector("#form");
    let tabla=document.querySelector("#tablaForm");


    let tablaUsuarios=[{
        "Nombre":"MarkitoChan",
        "Email":"marquitochan@gmail.com",
        "Telefono":2983563870,
        "Contraseña":"******"
    }]

    let cargarTresUsuarios=[{
        "Nombre":"WillyCyborg",
        "Email":"guillermolopez@gmail.com",
        "Telefono":3885490691,
        "Contraseña":"********"
    },{
        "Nombre":"Lucho",
        "Email":"luciano97@gmail.com",
        "Telefono":2281573190,
        "Contraseña":"*********"
    },{
        "Nombre":"El Baton",
        "Email":"mati23@gmail.com",
        "Telefono":1122734235,
        "Contraseña":"*****"
    }]

    mostrarTabla()
    document.querySelector("#agregarUno").addEventListener("click",agregarUno);

    function agregarUno(e){
        e.preventDefault();

        let formdata= new FormData(form);
        let nombre=formdata.get('name');
        let email=formdata.get('email');
        let numero=formdata.get('numero');
        let contraseña=formdata.get('pass')
        form.reset();
        let datosUsuario={

            "Nombre":nombre,
            "Email":email,
            "Telefono":numero,
            "Contraseña":contraseña

        }


        tablaUsuarios.push(datosUsuario);
        mostrarTabla()
        console.table(tablaUsuarios)
    }
    



    function mostrarTabla(){
        let pos=0;
        tabla.innerHTML=
        `<thead>
            <tr>
                <th>Nombre Usuario</th>
                <th>Email</th>
                <th>Numero de Telefono</th>
                <th>Contraseña</th>
            </tr>

        </thead>`

        for (const usuario of tablaUsuarios) {
            tabla.innerHTML+=
            `<tr>
            <td>${usuario.Nombre}</td>
            <td>${usuario.Email}</td>
            <td>${usuario.Telefono}</td>
            <td>${usuario.Contraseña}</td>
            </tr>`
        }


    }


    document.querySelector("#agregarTres").addEventListener("click",agregarTres);

    function agregarTres(e){
        e.preventDefault();
       tablaUsuarios= tablaUsuarios.concat(cargarTresUsuarios);
        mostrarTabla();

        /*for(let i=0;i<cargarTresUsuarios.length;i++){

            tablaUsuarios.push(agregarTres[i]);

        }*/
    }

    document.querySelector("#vaciar").addEventListener("click",function(e){
        e.preventDefault();
        tablaUsuarios=[];
        mostrarTabla();

    })

    document.querySelector("#borrarUno").addEventListener("click",function(e){

        e.preventDefault();
        tablaUsuarios.pop();
        mostrarTabla();

    })
    
   




















}