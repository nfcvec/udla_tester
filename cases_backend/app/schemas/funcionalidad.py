from pydantic import BaseModel

class FuncionalidadBase(BaseModel):
    nombre: str

class FuncionalidadCreate(FuncionalidadBase):
    aplicacion_id: int

class FuncionalidadUpdate(FuncionalidadBase):
    aplicacion_id: int

class Funcionalidad(FuncionalidadBase):
    id: int
    aplicacion_id: int

    class Config:
        from_attributes = True