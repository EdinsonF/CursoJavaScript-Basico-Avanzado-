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
        document.addEventListener("keydown",this.oprimir),
        p.borrar.addEventListener("click", m.borrarCalculadora)
    },

    oprimir: function(tecla){
        var valorCode = tecla.keyCode;
        console.log(valorCode);
                
        if( valorCode >= 96 && valorCode <= 105){

            console.log("keyCode", valorCode);
            for(var i = 96; i <= 105; i++){

                if (valorCode == i) {
                    
                    console.log("El numero que precione fue el",i-96);
                    p.digito = i-96;
                    p.accion = "numero";
                    
                    m.calculadora(p.accion, p.digito);

                }
                    
            }
        }

        if(valorCode >= 48 && valorCode <= 57){
            
            for(var i = 48; i <= 57; i++){

                if (valorCode == i) {
                    
                    console.log("El numero que precione fue el",i-48);
                    p.digito = i-48;
                    p.accion = "numero";
                    
                    m.calculadora(p.accion, p.digito);

                }
                    
            }

        }

        if (valorCode == 107 || valorCode == 187) {
            
            p.digito = "+";
            p.accion = "signo";
                    
            m.calculadora(p.accion, p.digito);
        }

        if (valorCode == 109|| valorCode == 189) {
            
            p.digito = "-";
            p.accion = "signo";
                    
            m.calculadora(p.accion, p.digito);
        }

        if (valorCode == 111) {
            
            p.digito = "/";
            p.accion = "signo";
                    
            m.calculadora(p.accion, p.digito);
        }

        if (valorCode == 106) {
            
            p.digito = "*";
            p.accion = "signo";
                    
            m.calculadora(p.accion, p.digito);
        }

        if (valorCode == 110|| valorCode == 190) {
            
            p.digito = ".";
            p.accion = "decimal";
                    
            m.calculadora(p.accion, p.digito);
        }

        if (valorCode == 13) {
            
            p.digito = "";
            p.accion = "igual";
                    
            m.calculadora(p.accion, p.digito);
        }

        if (valorCode == 46) {
         
            m.borrarCalculadora();
        }

        if (valorCode == 8) {
         
            m.eliminarCaracter();
        }

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
            
            var cadena = p.operaciones.innerHTML;
            var contar = 0;

            for (var i = 0; i < cadena.length; i++){

                if(cadena.charAt(i) == "."){

                    contar = i;

                }
            }
            
            if(p.operaciones.innerHTML == 0){

                console.log("contar", contar);

                if (contar > 0) {
                    
                    p.operaciones.innerHTML += digito;
                                       
                }else{

                    p.operaciones.innerHTML = digito;
                   
                }
          
            }else{

                p.operaciones.innerHTML += digito;

            }
            
        } 
        
        if(accion == "signo"){

           var cadena = p.operaciones.innerHTML;
           var validarSigno = cadena.slice(-1);

           if(validarSigno == "."){

              p.operaciones.innerHTML = cadena.slice(0, -1) + digito;
             
           }else{ 

                if(  validarSigno == "-" || validarSigno == "+" || 
                        validarSigno == "*" || validarSigno == "/" ){
                    
                        p.operaciones.innerHTML = cadena.slice(0, -1) + digito;

                }else{

                        p.operaciones.innerHTML += digito;    

                    }
            }
        }
        
        if(accion == "decimal"){
            
            var cadena = p.operaciones.innerHTML;
            var validarDecimal = cadena.slice(-1);

            let cadenaDig = (p.operaciones.innerHTML)+(digito);
            let string = '';
            console.clear();

            if( validarDecimal != "-" && validarDecimal != "+" &&
                validarDecimal != "/" && validarDecimal != "*"){

                if (validarDecimal != ".") {
                    var contar = 1;
                    var contarelse = 0;
                    var valSig = 0;
                
                    for (var i = 0; i <  cadenaDig.length; i++){

                        if(cadena.charAt(i) == "."){

                            contar++;

                        }
            
                        if( cadena.charAt(i) == "-" || cadena.charAt(i) == "+" ||
                            cadena.charAt(i) == "/" ||cadena.charAt(i) == "*" 
                        ){

                            valSig = i;
                            string = '';
                        
                        }
                        else{

                            string += cadenaDig.charAt(i);
                                       
                        }

                    }

                    console.log("string ", string); 

                    if(contar > 1){

                        if(valSig > 0){

                            if( validarDecimal != "-" && validarDecimal != "+" &&
                                validarDecimal != "/" && validarDecimal != "*"){

                                    for (let i = 0; i < string.length+1; i ++) {
                                        
                                        if(string.charAt(i) == "."){

                                            contarelse++;
                           
                                        }
                                        
                                    }

                                    if(contarelse <= 1){
                                        
                                        p.operaciones.innerHTML += digito

                                    }
                            }
                                                
                        }
                    

                    }else{

                        p.operaciones.innerHTML += digito;

                    }

                
                }
            }
        }
       
        if(accion == "igual"){
           
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
  
    }, eliminarCaracter: function(){

        var cadena = p.operaciones.innerHTML;

        if(cadena != 0){
            console.log ("Valor de Cadena", cadena);
            
            if (cadena.length == 1 ) {
                
                p.operaciones.innerHTML = 0;

            }else{
                
                p.operaciones.innerHTML = cadena.slice(0,-1);
            
            }
        }

    }
    
}


m.inicio();