from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.session import Base

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