from sqlalchemy import Column, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.session import Base

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