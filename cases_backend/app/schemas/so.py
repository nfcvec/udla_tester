from pydantic import BaseModel

class SOBase(BaseModel):
    nombre: str

class SOCreate(SOBase):
    aplicacion_id: int

class SOUpdate(SOBase):
    aplicacion_id: int

class SO(SOBase):
    id: int
    aplicacion_id: int

    class Config:
        from_attributes = True