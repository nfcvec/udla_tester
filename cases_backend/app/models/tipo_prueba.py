from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class TipoPrueba(Base):
    __tablename__ = 'tipo_prueba'
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))

    aplicacion = relationship("Aplicacion", back_populates="tipos_prueba")
