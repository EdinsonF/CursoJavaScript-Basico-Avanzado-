/*=============================================
OBJETOS CON LAS PROPIEDADES DE LA CALCULADORA
=============================================*/

var p = {
    teclas: document.querySelectorAll("#calculadora ul li"),
    /*  En la variable tecla se estan almacenando todas 
        las etiquetas  <li> del id="calculadora" que estan
        en el DOM

        la funcion document.querySelectorAll es para
        seleccionar todas las etiquetas indicadas en
        el parametro ("x")
        
    */
    accion: null,
    digito: null, 
    operaciones: document.querySelector("#operaciones"),
    cantidadSignos: 0,
    borrar: document.querySelector("#borrar"),
    contidadDecimal: false,
    resultado: false
}


/*=============================================
OBJETOS CON LOS MÉTODOS DE LA CALCULADORA
=============================================*/

var m = {
    inicio: function(){
       
        for (var i = 0; i < p.teclas.length; i++) {
            p.teclas[i].addEventListener("click",m.oprimirTecla)

            /*
                Cuando se haga clic sobre en una etiqueta
                <li> del id calculadora se va ejecutar la funcion
                oprimirTecla
            */
            
        }

        p.borrar.addEventListener("click", m.borrarCalculadora)
    },

    oprimirTecla: function(tecla){

        /*
            La funcion oprimirTecla no hay que iniciar de 
            forma manual porque se esta ejecuctando
            automaticamente por la funcion addEventListener("click")

        */

       p.accion = tecla.target.getAttribute("class");
        /*
            target.getAttribute() es una funcion para 
            seleccionar cualquier atributo que tenga la 
            etiqueta indicada en el parametro ("x").
        */

       p.digito = tecla.target.innerHTML;
        /*
            digito

            En este caso se va usar para captura el
            contenido de la etiqueta <li> a la que daremos
            clic

        */
       
        m.calculadora(p.accion, p.digito);

    },

    calculadora: function(accion, digito){

        if(accion == "numero"){
            
            p.cantidadSignos= 0

            if (p.operaciones.innerHTML == 0) {
  
                /* 
                    En el if se valida que si la etiqueta <li>
                    del id 'operaciones' en el DOM es igual a '0'
                    se debe sustituir dicho valor por el que viene
                    en el parametro digito
                */

                p.operaciones.innerHTML = digito;

            } else {
                
                if (!p.resultado) {
                    p.resultado = false;
                    p.operaciones.innerHTML += digito;

                    /* 
                        SE VALIDA QUE DESPUES PRECIONAR UNA IGUALDA 
                        SE PUEDA AGREGAR OTRA OPERACION Y SE PUEDA
                        AGRAGAR MAS NUMEROS
                    
                    */


                } else {

                    p.operaciones.innerHTML = digito;

                }

                /*
                    A p.operaciones se va agregar el valor
                    de la etiqueta <li> que reciba el clic en el
                    DOM mediante el parametro digito
                */

            }
            
        }else if(accion == "signo"){
           
            p.cantidadSignos ++

            if (p.cantidadSignos == 1) {
              
                if (p.operaciones.innerHTML == 0 ) {
                    
                    p.operaciones.innerHTML = 0

                } else {
                
                    p.operaciones.innerHTML += digito;
                    p.contidadDecimal = false;
                    p.resultado = false;

                }
                
            } 

        }else if(accion == "decimal"){
            
            if(!p.contidadDecimal){

                p.operaciones.innerHTML += digito;
                p.contidadDecimal = true;
                p.resultado = false;

            }

        }else{

            if (p.operaciones.innerHTML == 0) {
                
                p.operaciones.innerHTML = 0;

            } else {
             
                p.operaciones.innerHTML = eval(p.operaciones.innerHTML)

            /*
                eval () es una funcion predeterminada de javascript
                para resolver funciones matematicas de una variable
            */

                 p.resultado = true;

            }

            

        }
         
    }, borrarCalculadora: function(){

        p.operaciones.innerHTML = 0;
        p.resultado = false;
        p.contidadDecimal = false;   

    },


    
}


m.inicio();