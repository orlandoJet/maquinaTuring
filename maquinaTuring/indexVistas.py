from django.http import HttpResponse 
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import Historial
from django.shortcuts import redirect
#from automata.tm.tm  import Tape
from  automata.tm.ntm  import NTM

class CrearMaquinaTuring:
    @csrf_exempt
    def grafo(request):
        docExterno=open("C:/Users/user/Downloads/maquinaTuring/maquinaTuring/vista/static/grafo.html")
        plt=Template(docExterno.read())
        docExterno.close()
        ctx=Context()
        documento=plt.render(ctx)
        return HttpResponse(documento)
    @csrf_exempt
    def maquinaTuring(request,idioma):
        palabra = request.POST.get('palabra', '') # Obtener la palabra del usuario
        resultados = []
        p = list(palabra)
        if len(p) > 5 or p == 'a' or p =='b':
            for i in range(len(p)):
                if p[i] == 'b':
                    p[i] = 'a'
            resultados.append(f'La cadena "{palabra}" es aceptada')
        else:
            resultados.append(f'la cadena "{palabra}" no tiene suficientes letras o tiene algun caracter invalido')
        Historial(palabrasIngresadas=palabra, estadoDelaPalabra=resultados).save()
        docExterno=open("C:/Users/user/Downloads/maquinaTuring/maquinaTuring/vista/static/grafo.html")
        plt=Template(docExterno.read())
        docExterno.close()
        ctx=Context({'resultados': resultados, 'palabra': palabra, 'idioma':idioma})
        documento=plt.render(ctx)
        return HttpResponse(documento)
    
    @csrf_exempt
    def historial(request):
        historial_Palabras = Historial.objects.all()
        docExterno=open("C:/Users/user/Downloads/maquinaTuring/maquinaTuring/vista/static/grafo.html")
        plt=Template(docExterno.read())
        docExterno.close()
        ctx=Context({'historial': historial_Palabras})
        documento=plt.render(ctx)
        return HttpResponse(documento) 
    
    @csrf_exempt
    def borrar_historial(request):
        Historial.objects.all().delete()
        return redirect('historial')