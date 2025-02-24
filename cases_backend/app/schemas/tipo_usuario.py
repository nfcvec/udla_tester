from pydantic import BaseModel

class TipoUsuarioBase(BaseModel):
    nombre: str

class TipoUsuarioCreate(TipoUsuarioBase):
    aplicacion_id: int

class TipoUsuarioUpdate(TipoUsuarioBase):
    aplicacion_id: int

class TipoUsuario(TipoUsuarioBase):
    id: int
    aplicacion_id: int

    class Config:
        from_attributes = True