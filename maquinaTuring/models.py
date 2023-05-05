from django.db import models
from django.utils.translation import gettext_lazy as _

class Historial(models.Model):
    palabrasIngresadas =  models.CharField(max_length=6, verbose_name=_("Palabras ingresadas"))
    estadoDelaPalabra =  models.CharField(max_length=200, verbose_name=_("Estado de la palabra"))
