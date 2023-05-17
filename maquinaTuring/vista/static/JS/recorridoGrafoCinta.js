class receptora{
    constructor(valor){
        this.valor=valor;
    };
    encenderLinea(){
        this.valor.style.borderTopColor="green";
    }
    encenderFlecha(){
        this.valor.style.borderTopColor="green";
        this.valor.style.borderRightColor="green";
    }
    encenderEstado(){
        this.valor.style.borderColor="green";
    }
    encenderLineaCurva(){
        let ctx=this.valor.getContext("2d");
        ctx.strokeStyle = "green";
        ctx.stroke();
    }    
    encenderEstadoAceptacion(){
        this.valor.style.borderColor="green";
        this.valor.style.outlineColor="green";
    }
    encenderTransicion(){
        this.valor.style.color="green"
    }

}
class interfazComando{
    constructor(valor){
        this.valor=valor;
    }
    ejecutar(){

    }
}    
class comandoEncenderLinea extends interfazComando{
    constructor(valor){
        super(valor);
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderLinea();  
    } 
    
}
class comandoEncenderFlecha extends interfazComando{
    constructor(valor){
        super(valor);
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderFlecha();  
    } 
    
}
class comandoEncenderEstado extends interfazComando{
    constructor(valor){
        super(valor);
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderEstado();  
    } 
    
}
class comandoEncenderLineaCurva extends interfazComando{
    constructor(valor){
        super(valor);
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderLineaCurva();  
    } 
    
}
class comandoEncenderEstadoAceptacion extends interfazComando{
    constructor(valor){
        super(valor);
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderEstadoAceptacion();  
    } 
    
}
class comandoEncenderTransicion extends interfazComando{
    constructor(valor){
        super(valor);
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderTransicion();  
    } 
    
}
class invocadora{
    constructor(comando){
        this.comando=comando;
    }
    comandoEjecucion(){
        this.comando.ejecutar();
    }
}

function encenderGrafo(){
    if (document.getElementById("mensajeAutomata")!=null) {
        let cadenaCompleta=document.getElementById("mensajeAutomata").innerText;
        let palabra=obtenerPalabraValida(cadenaCompleta);
        let retraso = retrasoSegundos();
        console.log("E",retraso);
        let auxRetr=retraso;
        if(palabra!=null){
            setTimeout(function(){correrComandos("q1","l1","f1","","","")},retraso);
            retraso=retraso+auxRetr;
            for(let i=0; i<palabra.length; i++){
                if (palabra[i]=="a" && i<palabra.length){
                    setTimeout(function(){correrComandos("","","f4","flechaCurva1","","let1")},retraso);
                    
                    if (i+1<palabra.length){
                        setTimeout(function(){document.getElementById("let1").style.color="black"},retraso+auxRetr);
                        setTimeout(function(){document.getElementById("f4").style.borderTopColor="black"},retraso+auxRetr);
                        setTimeout(function(){document.getElementById("f4").style.borderRightColor="black"},retraso+auxRetr);
                        setTimeout(function(){let ctx=document.getElementById("flechaCurva1").getContext("2d");ctx.strokeStyle = "black";ctx.stroke()},retraso+auxRetr); 
                    }
                    if (palabra[i+1]=="a"){
                        retraso=retraso+auxRetr;
                    }
                }
                if (palabra[i]=="b" && i<palabra.length){
                    setTimeout(function(){correrComandos("","","f5","flechaCurva2","","let2")},retraso);
                    
                    palabra[i]="a";
                    if (i+1<palabra.length){
                        setTimeout(function(){document.getElementById("let2").style.color="black"},retraso+auxRetr);
                        setTimeout(function(){document.getElementById("f5").style.borderTopColor="black"},retraso+auxRetr);
                        setTimeout(function(){document.getElementById("f5").style.borderRightColor="black"},retraso+auxRetr);
                        setTimeout(function(){let ctx=document.getElementById("flechaCurva2").getContext("2d");ctx.strokeStyle = "black";ctx.stroke()},retraso+auxRetr);
                    }
                    if (palabra[i+1]=="b"){
                        retraso=retraso+auxRetr;
                    }
                }
                retraso=retraso+auxRetr;
            }
            for (let j = palabra.length; j>=0; j--){
                if (j==palabra.length){
                    setTimeout(function(){correrComandos("q2","l2","f2","","","let3")},retraso);
                }
                if(j<palabra.length){
                    setTimeout(function(){correrComandos("","","f6","flechaCurva3","","let4")},retraso);
                }
                if(j-1<0){
                    setTimeout(function(){correrComandos("","l3","f3","","q3","let5")},retraso);
                }
                retraso=retraso+auxRetr;
            }
        }
        
    }
}
function correrComandos(estado,linea,flecha,lineaCurva,aceptacion,transicion){
    let comando=null;
    if(transicion!=""){
        comando=new invocadora(new comandoEncenderTransicion(document.getElementById(transicion)));
        comando.comandoEjecucion();
    }
    if(linea!=""){
        comando=new invocadora(new comandoEncenderLinea(document.getElementById(linea)));
        comando.comandoEjecucion();
    }
    if (lineaCurva!="") {
        comando=new invocadora(new comandoEncenderLineaCurva(document.getElementById(lineaCurva)));
        comando.comandoEjecucion();  
    }
    if (flecha!="") {
        comando=new invocadora(new comandoEncenderFlecha(document.getElementById(flecha)));
        comando.comandoEjecucion();  
    }

    if(estado!=""){
        comando=new invocadora(new comandoEncenderEstado(document.getElementById(estado)));
        comando.comandoEjecucion(); 
    }
    if(aceptacion!=""){
        comando=new invocadora(new comandoEncenderEstadoAceptacion(document.getElementById(aceptacion)));
        comando.comandoEjecucion();
    }
}
function obtenerPalabraValida(cadenaCompleta){
    let palabraIndiceInicial=cadenaCompleta.indexOf('"');
    let palabra="";
    for (let i = cadenaCompleta.length; i>=0; i--) {
        if (cadenaCompleta[i]=='"') {
            palabra=cadenaCompleta.substring(palabraIndiceInicial+1,i);
            break;
        }
    }
    for (let i = 0; i<palabra.length; i++) {
        if (palabra[i]==" ") {
            palabra=null;
            break;
        }
        if (palabra.length<=5) {
            palabra=null;
            break;
        }
        if (palabra[i]=="a" || palabra[i]=="b") {
            palabra=palabra;
        }
        else{
            palabra=null;
            break;
        }
    }
    return palabra;
}
function velocidadEjecucion() {
    let url = document.getElementById("evaluador").action;
    let velocidadEscogida = document.getElementById("velocidad").value;
    let velocidadActual = null;
    for (let i = url.length; i >= 0; i--) {
      if (url[i] == "/") {
        velocidadActual = url.substring(i + 1);
        break;
      }
    }
    document.getElementById("evaluador").action = url.replace(
      velocidadActual,
      velocidadEscogida
    );
    document.getElementById("velocidad").innerText = velocidadEscogida;
    //console.log("Velocidad ejecucion",velocidadEscogida);
    return velocidadEscogida;
    
}

function retrasoSegundos() {
    let segundos = 0;
    let velocidad=null;
    let velocidadEscog=velocidadEjecucion();
    if (velocidadEscog != null) {
        velocidad=velocidadEscog;
        if (velocidad == "10") {
            segundos = 900;
        } 
        if (velocidad == "9") {
            segundos = 2000;
        } 
        if (velocidad == "8") {
            segundos = 3000;
        } 
        if (velocidad == "7") {
            segundos = 4000;
        } 
        if (velocidad == "6") {
            segundos = 5000;
        } 
        if (velocidad == "5") {
            segundos = 6000;
        } 
        if (velocidad == "4") {
            segundos = 7000;
        } 
        if (velocidad == "3") {
            segundos = 8000;
        } 
        if (velocidad == "2") {
            segundos = 9000;
        } 
        if (velocidad == "1") {
            segundos = 10000;
        }
        if (velocidad == "0") {
            segundos = 11000;
        }
    }
    return  segundos; 
}