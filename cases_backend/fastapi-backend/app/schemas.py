from pydantic import BaseModel
from typing import List, Optional
from typing import Dict

class AplicacionBase(BaseModel):
    nombre: str

class AplicacionUpdate(AplicacionBase):
    pass

class AplicacionCreate(AplicacionBase):
    pass

class Aplicacion(AplicacionBase):
    id: int

    class Config:

        from_attributes = True

class PantallaBase(BaseModel):
    nombre: str
    aplicacion_id: int

class PantallaCreate(PantallaBase):
    pass

class PantallaUpdate(PantallaBase):
    pass

class Pantalla(PantallaBase):
    id: int
    aplicacion: Aplicacion

    class Config:

        from_attributes = True
    

class FuncionalidadBase(BaseModel):
    nombre: str
    aplicacion_id: int

class FuncionalidadCreate(FuncionalidadBase):
    pass

class FuncionalidadUpdate(FuncionalidadBase):
    pass

class Funcionalidad(FuncionalidadBase):
    id: int
    aplicacion: Aplicacion

    class Config:

        from_attributes = True

class SOBase(BaseModel):
    nombre: str
    aplicacion_id: int

class SOCreate(SOBase):
    pass

class SOUpdate(SOBase):
    pass

class SO(SOBase):
    id: int
    aplicacion: Aplicacion

    class Config:

        from_attributes = True

class TipoPruebaBase(BaseModel):
    nombre: str
    aplicacion_id: int

class TipoPruebaCreate(TipoPruebaBase):
    pass

class TipoPruebaUpdate(TipoPruebaBase):
    pass

class TipoPrueba(TipoPruebaBase):
    id: int
    aplicacion: Aplicacion

    class Config:

        from_attributes = True

class TipoUsuarioBase(BaseModel):
    nombre: str
    aplicacion_id: int

class TipoUsuarioCreate(TipoUsuarioBase):
    pass

class TipoUsuarioUpdate(TipoUsuarioBase):
    pass

class TipoUsuario(TipoUsuarioBase):
    id: int
    aplicacion: Aplicacion

    class Config:

        from_attributes = True

class CasoPruebaBase(BaseModel):
    paso_a_paso: str
    funcionalidad_id: int
    so_id: int
    tipo_prueba_id: int
    pantalla_id: int
    aplicacion_id: int
    tipo_usuario_id: int

class CasoPruebaCreate(CasoPruebaBase):
    pass

class CasoPruebaUpdate(CasoPruebaBase):
    pass

class CasoPrueba(CasoPruebaBase):
    id: int
    aplicacion: Aplicacion
    funcionalidad: Funcionalidad
    so: SO
    tipo_prueba: TipoPrueba
    pantalla: Pantalla
    tipo_usuario: TipoUsuario

    class Config:

        from_attributes = True