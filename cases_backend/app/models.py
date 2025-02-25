from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Aplicacion(Base):
    __tablename__ = 'aplicacion'
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)

    pantallas = relationship("Pantalla", back_populates="aplicacion")
    funcionalidades = relationship("Funcionalidad", back_populates="aplicacion")
    sos = relationship("SO", back_populates="aplicacion")
    tipos_prueba = relationship("TipoPrueba", back_populates="aplicacion")
    tipos_usuario = relationship("TipoUsuario", back_populates="aplicacion")
    casos_prueba = relationship("CasoPrueba", back_populates="aplicacion")

class Pantalla(Base):
    __tablename__ = 'pantalla'
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))

    aplicacion = relationship("Aplicacion", back_populates="pantallas")

class Funcionalidad(Base):
    __tablename__ = 'funcionalidad'
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))

    aplicacion = relationship("Aplicacion", back_populates="funcionalidades")

class SO(Base):
    __tablename__ = 'so'
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))

    aplicacion = relationship("Aplicacion", back_populates="sos")

class TipoPrueba(Base):
    __tablename__ = 'tipo_prueba'
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))

    aplicacion = relationship("Aplicacion", back_populates="tipos_prueba")

class TipoUsuario(Base):
    __tablename__ = 'tipo_usuario'
    
    id = Column(Integer, primary_key=True, index=True)
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))
    nombre = Column(String, index=True)

    aplicacion = relationship("Aplicacion", back_populates="tipos_usuario")

class CasoPrueba(Base):
    __tablename__ = 'caso_prueba'
    
    id = Column(Integer, primary_key=True, index=True)
    paso_a_paso = Column(Text)
    funcionalidad_id = Column(Integer, ForeignKey('funcionalidad.id'))
    so_id = Column(Integer, ForeignKey('so.id'))
    tipo_prueba_id = Column(Integer, ForeignKey('tipo_prueba.id'))
    pantalla_id = Column(Integer, ForeignKey('pantalla.id'))
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))
    tipo_usuario_id = Column(Integer, ForeignKey('tipo_usuario.id'))

    aplicacion = relationship("Aplicacion", back_populates="casos_prueba")
    funcionalidad = relationship("Funcionalidad")
    so = relationship("SO")
    tipo_prueba = relationship("TipoPrueba")
    pantalla = relationship("Pantalla")
    tipo_usuario = relationship("TipoUsuario")
    
