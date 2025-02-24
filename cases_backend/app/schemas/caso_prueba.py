from pydantic import BaseModel

class CasoPruebaBase(BaseModel):
    paso_a_paso: str

class CasoPruebaCreate(CasoPruebaBase):
    funcionalidad_id: int
    so_id: int
    tipo_prueba_id: int
    pantalla_id: int
    aplicacion_id: int
    tipo_usuario_id: int

class CasoPruebaUpdate(CasoPruebaBase):
    funcionalidad_id: int
    so_id: int
    tipo_prueba_id: int
    pantalla_id: int
    aplicacion_id: int
    tipo_usuario_id: int

class CasoPrueba(CasoPruebaBase):
    id: int
    funcionalidad_id: int
    so_id: int
    tipo_prueba_id: int
    pantalla_id: int
    aplicacion_id: int
    tipo_usuario_id: int

    class Config:
        from_attributes = True