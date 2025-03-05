from datetime import datetime
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


class FuncionalidadesProcesoBase(BaseModel):
    funcionalidad_id: int
    proceso_id: int

class FuncionalidadesProcesoCreate(FuncionalidadesProcesoBase):
    pass

class FuncionalidadesProcesoUpdate(FuncionalidadesProcesoBase):
    pass

class FuncionalidadesProceso(FuncionalidadesProcesoBase):
    id: int

    class Config:
        from_attributes = True

class TestersProcesoBase(BaseModel):
    proceso_id: int
    tester_id: str

class TestersProcesoCreate(TestersProcesoBase):
    pass

class TestersProcesoUpdate(TestersProcesoBase):
    pass

class TestersProceso(TestersProcesoBase):
    id: int

    class Config:
        from_attributes = True

class AsignacionBase(BaseModel):
    proceso_id: int
    tester_id: str
    caso_prueba_id: int

class AsignacionCreate(AsignacionBase):
    pass

class AsignacionUpdate(AsignacionBase):
    pass

class ResultadoBase(BaseModel):
    asignacion_id: int
    id_usuario_prueba: str
    tiempo_resolucion: int
    ok_funcionamiento: bool
    ok_ux: bool
    observaciones: Optional[str] = None

class ResultadoCreate(ResultadoBase):
    pass

class ResultadoUpdate(ResultadoBase):
    pass

class Resultado(ResultadoBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Asignacion(AsignacionBase):
    id: int
    caso_prueba: CasoPrueba
    resultados: List[Resultado] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProcesoBase(BaseModel):
    nombre: str
    descripcion: str
    aplicacion_id: int

class ProcesoCreate(ProcesoBase):
    pass

class ProcesoUpdate(ProcesoBase):
    pass

class Proceso(ProcesoBase):
    id: int
    aplicacion: Aplicacion
    funcionalidades_proceso: List[FuncionalidadesProceso] = []
    testers_proceso: List[TestersProceso] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True