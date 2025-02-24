from pydantic import BaseModel

class AplicacionBase(BaseModel):
    nombre: str

class AplicacionCreate(AplicacionBase):
    pass

class AplicacionUpdate(AplicacionBase):
    pass

class Aplicacion(AplicacionBase):
    id: int

    class Config:
        from_attributes = True