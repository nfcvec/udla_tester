from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SistemaBase(BaseModel):
    nombre: str

class SistemaCreate(SistemaBase):
    pass

class Sistema(SistemaBase):
    id_sistema: int

    class Config:
        orm_mode = True

class TestSetBase(BaseModel):
    razon: str
    creado_por: str
    fecha_creacion: Optional[datetime] = None

class TestSetCreate(TestSetBase):
    pass

class TestSet(TestSetBase):
    id_set: int

    class Config:
        orm_mode = True

# Repetir para las demás entidades (TestCase, TestSetItem, Tester, Assignment, TestResult)
