from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Sistema(Base):
    __tablename__ = "sistemas"
    id_sistema = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False, unique=True)

class TestSet(Base):
    __tablename__ = "test_sets"
    id_set = Column(Integer, primary_key=True, index=True)
    razon = Column(String, nullable=False)
    creado_por = Column(String, nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)

class TestCase(Base):
    __tablename__ = "test_cases"
    id_caso = Column(Integer, primary_key=True, index=True)
    id_sistema = Column(Integer, ForeignKey("sistemas.id_sistema"))
    funcionalidad = Column(String, nullable=False)
    so = Column(String, nullable=False)
    descripcion = Column(String)

    sistema = relationship("Sistema")

class TestSetItem(Base):
    __tablename__ = "test_set_items"
    id_item = Column(Integer, primary_key=True, index=True)
    id_set = Column(Integer, ForeignKey("test_sets.id_set"))
    id_caso = Column(Integer, ForeignKey("test_cases.id_caso"))

    test_set = relationship("TestSet")
    test_case = relationship("TestCase")

class Tester(Base):
    __tablename__ = "testers"
    id_tester = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    correo = Column(String, unique=True, nullable=False)

class Assignment(Base):
    __tablename__ = "assignments"
    id_asignacion = Column(Integer, primary_key=True, index=True)
    id_tester = Column(Integer, ForeignKey("testers.id_tester"))
    id_set = Column(Integer, ForeignKey("test_sets.id_set"))

    tester = relationship("Tester")
    test_set = relationship("TestSet")

class TestResult(Base):
    __tablename__ = "test_results"
    id_resultado = Column(Integer, primary_key=True, index=True)
    id_item = Column(Integer, ForeignKey("test_set_items.id_item"))
    id_tester = Column(Integer, ForeignKey("testers.id_tester"))
    fecha_ejecucion = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, nullable=False)
    metrica_1 = Column(Float)
    metrica_2 = Column(Float)
    observaciones = Column(String)

    test_item = relationship("TestSetItem")
    tester = relationship("Tester")
