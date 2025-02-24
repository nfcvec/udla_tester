from pydantic import BaseModel

class PantallaBase(BaseModel):
    nombre: str

class PantallaCreate(PantallaBase):
    aplicacion_id: int

class PantallaUpdate(PantallaBase):
    aplicacion_id: int

class Pantalla(PantallaBase):
    id: int
    aplicacion_id: int

    class Config:
        from_attributes = True