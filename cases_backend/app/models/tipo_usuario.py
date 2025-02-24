from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class TipoUsuario(Base):
    __tablename__ = 'tipo_usuario'
    
    id = Column(Integer, primary_key=True, index=True)
    aplicacion_id = Column(Integer, ForeignKey('aplicacion.id'))
    nombre = Column(String, index=True)

    aplicacion = relationship("Aplicacion", back_populates="tipos_usuario")