from pydantic import BaseModel

class TipoPruebaBase(BaseModel):
    nombre: str

class TipoPruebaCreate(TipoPruebaBase):
    aplicacion_id: int

class TipoPruebaUpdate(TipoPruebaBase):
    aplicacion_id: int

class TipoPrueba(TipoPruebaBase):
    id: int
    aplicacion_id: int

    class Config:
        from_attributes = True