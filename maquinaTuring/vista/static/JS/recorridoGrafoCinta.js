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
        let retraso=retrasoSegundos();
        let auxRetr=retraso;
        let trans=-50;
        if(palabra!=null){
            let letrasB=llenarCinta(palabra);
            let indexB=0;
            setTimeout(function(){correrComandos("q1","l1","f1","","","")},retraso);
            retraso=retraso+auxRetr;
            for(let i=0; i<palabra.length; i++){
                if (palabra[i]=="a" && i<palabra.length){
                    setTimeout(function(){correrComandos("","","f4","flechaCurva1","","let1")},retraso);
                    setTimeout(recorrerCinta,retraso,trans);
                    trans=trans-50;
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
                    setTimeout(recorrerCinta,retraso,trans);
                    setTimeout(cambiarBporA,retraso,letrasB,indexB);
                    indexB++;
                    trans=trans-50;
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
                    trans=trans+100;
                    setTimeout(function(){correrComandos("q2","l2","f2","","","let3")},retraso);
                    setTimeout(recorrerCinta,retraso,trans);
                }
                if(j<palabra.length){
                    trans=trans+50;
                    setTimeout(function(){correrComandos("","","f6","flechaCurva3","","let4")},retraso);
                    setTimeout(recorrerCinta,retraso,trans);
                }
                if(j-1<0){
                    trans=trans-50;
                    retraso=retraso+auxRetr;
                    setTimeout(function(){correrComandos("","l3","f3","","q3","let5")},retraso);
                    setTimeout(recorrerCinta,retraso,trans);
                }
                retraso=retraso+auxRetr;
            }
        }
    }
}
var cadenaCompletaPaso=null
var palabraPaso=null;
var indexPaso=null;
var transPaso=null;
var letrasBPaso=null;
var indexBPaso=null;
var finalCinta=null;
function iniciarControlPaso(){
    cadenaCompletaPaso=document.getElementById("mensajeAutomata").innerText;
    palabraPaso=obtenerPalabraValida(cadenaCompletaPaso);
    indexPaso=0;
    transPaso=-50;
    letrasBPaso=llenarCinta(palabraPaso);
    indexBPaso=0;
    finalCinta=false;
}
function controlPaso(){
    if(indexPaso<palabraPaso.length && finalCinta==false){
        if(indexPaso==0){
            correrComandos("q1","l1","f1","","","");
        }
        if (palabraPaso[indexPaso]=="a" && indexPaso<palabraPaso.length){
            correrComandos("","","f4","flechaCurva1","","let1");
            recorrerCinta(transPaso);
            transPaso=transPaso-50;
            document.getElementById("let2").style.color="black";
            document.getElementById("f5").style.borderTopColor="black";
            document.getElementById("f5").style.borderRightColor="black";
            let ctx=document.getElementById("flechaCurva2").getContext("2d");
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        if (palabraPaso[indexPaso]=="b" && indexPaso<palabraPaso.length){
            correrComandos("","","f5","flechaCurva2","","let2");
            palabraPaso[indexPaso]="a";
            recorrerCinta(transPaso);
            cambiarBporA(letrasBPaso,indexBPaso);
            indexBPaso++;
            transPaso=transPaso-50;
            document.getElementById("let1").style.color="black";
            document.getElementById("f4").style.borderTopColor="black";
            document.getElementById("f4").style.borderRightColor="black";
            let ctx=document.getElementById("flechaCurva1").getContext("2d");
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        if(indexPaso+1==palabraPaso.length){
            finalCinta=true;
            console.log(indexPaso);
            console.log(transPaso);
        }
        indexPaso++;
    }
    else if(finalCinta){
        if(indexPaso==palabraPaso.length){
            transPaso=transPaso+100;
            correrComandos("q2","l2","f2","","","let3");
            recorrerCinta(transPaso);
        }
        if(indexPaso<palabraPaso.length && indexPaso>=0){
            transPaso=transPaso+50;
            correrComandos("","","f6","flechaCurva3","","let4");
            recorrerCinta(transPaso);
        }
        if(indexPaso<0){
            transPaso=transPaso-50;
            correrComandos("","l3","f3","","q3","let5");
            recorrerCinta(transPaso);
            document.getElementById("validacionPaso").disabled = true;
            document.getElementById("validacionPaso").style.background="red"
        }
        indexPaso--;
    }

}
function cambiarBporA(letrasB,index){
    let texto=letrasB[index];
    texto.innerHTML="a";
}
function llenarCinta(palabra) {
    let texto=null;
    let cantTrans=480;
    let letrasB=[];
    if (palabra.length==1) {
        document.getElementById("letraComienzo").innerHTML=palabra;
        letrasB.push(document.getElementById("letraComienzo"));
    }
    else{
        for(let i=0; i<palabra.length; i++){
            if (i==0) {
                document.getElementById("letraComienzo").innerHTML=palabra[i];
                if (palabra[i]=="b") {
                    letrasB.push(document.getElementById("letraComienzo"));
                }
            }
            if (i==1) {
                document.getElementById("letraSiguiente").innerHTML=palabra[i];
                if (palabra[i]=="b") {
                    letrasB.push(document.getElementById("letraSiguiente"));
                }
            }
            if (i>1) {
                cantTrans=cantTrans+50;
                texto=crearCuadroCinta(cantTrans);
                texto.innerHTML=palabra[i];
                if (palabra[i]=="b") {
                    letrasB.push(texto);
                }
            }
            if (i+1==palabra.length) {
                cantTrans=cantTrans+50;
                texto=crearCuadroCinta(cantTrans);
            }

        }
    }
    return letrasB;
}
function crearCuadroCinta(cantTrans){
    let cinta=document.getElementById("cinta");
    let g=null;
    let recta=null;
    let texto=null;
    let trans=null;
    let svgns = "http://www.w3.org/2000/svg";
    g=document.createElementNS(svgns,"g");
    g.setAttribute("class", "simbolo");
    trans="translate("+cantTrans+")";
    g.setAttribute("transform", trans);
    recta=document.createElementNS(svgns,"rect");
    recta.setAttribute("class", "cuadro");
    recta.setAttribute("width", "50");
    recta.setAttribute("height", "50");
    texto=document.createElementNS(svgns,"text");
    texto.setAttribute("class", "letraCin");
    texto.setAttribute("x", "20");
    texto.setAttribute("y", "33");
    g.appendChild(recta);
    g.appendChild(texto);
    cinta.appendChild(g);
    return texto;
}
function recorrerCinta(movimiento) {
    anime({
        targets: '#cinta',
        translateX: movimiento,
        translateY: 10
      });
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
        if (palabra.length<0) {
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

function velocidadEjecucion(velocidadEscogida) {
    let url=document.getElementById("evaluador").action;
    let seleccion=document.getElementById("velocidadSelec").innerHTML;
    if (velocidadEscogida=="null"){
        velocidadEscogida=document.getElementById("velocidad").value;
    } 
    let velocidadActual=null;
    for (let i = url.length; i>=0; i--) {
        if (url[i]=="/") {
            velocidadActual=url.substring(i+1);
            break;
        }
        
    }
    let seleccionActual=null;
    for (let j = 0; j < seleccion.length; j++) {
        if (seleccion[j]==":") {
            seleccionActual=seleccion.substring(j+1);
            break;
        }
    }

    document.getElementById("velocidadSelec").innerHTML=seleccion.replace(seleccionActual,velocidadEscogida+"}");
    document.getElementById("evaluador").action=url.replace("/"+velocidadActual,"/"+velocidadEscogida);
}

function retrasoSegundos() {
    let segundos = 0;
    let velocidad=null;
    let velocidadEscog=document.getElementById("velocidadSelec").innerHTML;
    for(let i=velocidadEscog.length; i>=0;i--){
        if (velocidadEscog[i]==":"){
            velocidad=velocidadEscog.substring(i+1,velocidadEscog.length-1);
        }
    }
    if (document.getElementById("velocidad")!=null){
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