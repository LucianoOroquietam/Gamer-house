
document.addEventListener('DOMContentLoaded', iniciarPagina);

function iniciarPagina(){
    document.querySelector("#btn-toogle").addEventListener("click", function(e){

        let nav = document.querySelector("#navegacion")
        toggleMenu(nav);
    })
    
    function toggleMenu(nav){
    
        nav.classList.toggle("show");
    
    }


}

