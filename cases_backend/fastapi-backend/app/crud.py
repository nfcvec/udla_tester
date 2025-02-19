from sqlalchemy.orm import Session
from . import models, schemas

def create_aplicacion(db: Session, aplicacion: schemas.AplicacionCreate):
    db_aplicacion = models.Aplicacion(**aplicacion.dict())
    db.add(db_aplicacion)
    db.commit()
    db.refresh(db_aplicacion)
    return db_aplicacion

def get_aplicacion(db: Session, aplicacion_id: int):
    return db.query(models.Aplicacion).filter(models.Aplicacion.id == aplicacion_id).first()

def get_aplicaciones(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Aplicacion).offset(skip).limit(limit).all()

def update_aplicacion(db: Session, aplicacion_id: int, aplicacion: schemas.AplicacionUpdate):
    db_aplicacion = db.query(models.Aplicacion).filter(models.Aplicacion.id == aplicacion_id).first()
    db_aplicacion.nombre = aplicacion.nombre
    db.commit()
    db.refresh(db_aplicacion)
    return db_aplicacion

def delete_aplicacion(db: Session, aplicacion_id: int):
    db_aplicacion = db.query(models.Aplicacion).filter(models.Aplicacion.id == aplicacion_id).first()
    db.delete(db_aplicacion)
    db.commit()
    return db_aplicacion

def create_pantalla(db: Session, pantalla: schemas.PantallaCreate):
    db_pantalla = models.Pantalla(**pantalla.dict())
    db.add(db_pantalla)
    db.commit()
    db.refresh(db_pantalla)
    return db_pantalla

def get_pantalla(db: Session, pantalla_id: int):
    return db.query(models.Pantalla).filter(models.Pantalla.id == pantalla_id).first()

def get_pantallas(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Pantalla).offset(skip).limit(limit).all()

def update_pantalla(db: Session, pantalla_id: int, pantalla: schemas.PantallaUpdate):
    db_pantalla = db.query(models.Pantalla).filter(models.Pantalla.id == pantalla_id).first()
    db_pantalla.nombre = pantalla.nombre
    db_pantalla.aplicacion_id = pantalla.aplicacion_id
    db.commit()
    db.refresh(db_pantalla)
    return db_pantalla

def delete_pantalla(db: Session, pantalla_id: int):
    db_pantalla = db.query(models.Pantalla).filter(models.Pantalla.id == pantalla_id).first()
    db.delete(db_pantalla)
    db.commit()
    return db_pantalla

def create_funcionalidad(db: Session, funcionalidad: schemas.FuncionalidadCreate):
    db_funcionalidad = models.Funcionalidad(**funcionalidad.dict())
    db.add(db_funcionalidad)
    db.commit()
    db.refresh(db_funcionalidad)
    return db_funcionalidad

def get_funcionalidad(db: Session, funcionalidad_id: int):
    return db.query(models.Funcionalidad).filter(models.Funcionalidad.id == funcionalidad_id).first()

def get_funcionalidades(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Funcionalidad).offset(skip).limit(limit).all()

def update_funcionalidad(db: Session, funcionalidad_id: int, funcionalidad: schemas.FuncionalidadUpdate):
    db_funcionalidad = db.query(models.Funcionalidad).filter(models.Funcionalidad.id == funcionalidad_id).first()
    db_funcionalidad.nombre = funcionalidad.nombre
    db_funcionalidad.aplicacion_id = funcionalidad.aplicacion_id
    db.commit()
    db.refresh(db_funcionalidad)
    return db_funcionalidad

def delete_funcionalidad(db: Session, funcionalidad_id: int):
    db_funcionalidad = db.query(models.Funcionalidad).filter(models.Funcionalidad.id == funcionalidad_id).first()
    db.delete(db_funcionalidad)
    db.commit()
    return db_funcionalidad

def create_so(db: Session, so: schemas.SOCreate):
    db_so = models.SO(**so.dict())
    db.add(db_so)
    db.commit()
    db.refresh(db_so)
    return db_so

def get_so(db: Session, so_id: int):
    return db.query(models.SO).filter(models.SO.id == so_id).first()

def get_sos(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.SO).offset(skip).limit(limit).all()

def update_so(db: Session, so_id: int, so: schemas.SOUpdate):
    db_so = db.query(models.SO).filter(models.SO.id == so_id).first()
    db_so.nombre = so.nombre
    db_so.aplicacion_id = so.aplicacion_id
    db.commit()
    db.refresh(db_so)
    return db_so

def delete_so(db: Session, so_id: int):
    db_so = db.query(models.SO).filter(models.SO.id == so_id).first()
    db.delete(db_so)
    db.commit()
    return db_so

def create_tipo_prueba(db: Session, tipo_prueba: schemas.TipoPruebaCreate):
    db_tipo_prueba = models.TipoPrueba(**tipo_prueba.dict())
    db.add(db_tipo_prueba)
    db.commit()
    db.refresh(db_tipo_prueba)
    return db_tipo_prueba

def get_tipo_prueba(db: Session, tipo_prueba_id: int):
    return db.query(models.TipoPrueba).filter(models.TipoPrueba.id == tipo_prueba_id).first()

def get_tipos_prueba(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.TipoPrueba).offset(skip).limit(limit).all()

def update_tipo_prueba(db: Session, tipo_prueba_id: int, tipo_prueba: schemas.TipoPruebaUpdate):
    db_tipo_prueba = db.query(models.TipoPrueba).filter(models.TipoPrueba.id == tipo_prueba_id).first()
    db_tipo_prueba.nombre = tipo_prueba.nombre
    db_tipo_prueba.aplicacion_id = tipo_prueba.aplicacion_id
    db.commit()
    db.refresh(db_tipo_prueba)
    return db_tipo_prueba

def delete_tipo_prueba(db: Session, tipo_prueba_id: int):
    db_tipo_prueba = db.query(models.TipoPrueba).filter(models.TipoPrueba.id == tipo_prueba_id).first()
    db.delete(db_tipo_prueba)
    db.commit()
    return db_tipo_prueba

def create_tipo_usuario(db: Session, tipo_usuario: schemas.TipoUsuarioCreate):
    db_tipo_usuario = models.TipoUsuario(**tipo_usuario.dict())
    db.add(db_tipo_usuario)
    db.commit()
    db.refresh(db_tipo_usuario)
    return db_tipo_usuario

def get_tipo_usuario(db: Session, tipo_usuario_id: int):
    return db.query(models.TipoUsuario).filter(models.TipoUsuario.id == tipo_usuario_id).first()

def get_tipos_usuario(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.TipoUsuario).offset(skip).limit(limit).all()

def update_tipo_usuario(db: Session, tipo_usuario_id: int, tipo_usuario: schemas.TipoUsuarioUpdate):
    db_tipo_usuario = db.query(models.TipoUsuario).filter(models.TipoUsuario.id == tipo_usuario_id).first()
    db_tipo_usuario.nombre = tipo_usuario.nombre
    db_tipo_usuario.aplicacion_id = tipo_usuario.aplicacion_id
    db.commit()
    db.refresh(db_tipo_usuario)
    return db_tipo_usuario

def delete_tipo_usuario(db: Session, tipo_usuario_id: int):
    db_tipo_usuario = db.query(models.TipoUsuario).filter(models.TipoUsuario.id == tipo_usuario_id).first()
    db.delete(db_tipo_usuario)
    db.commit()
    return db_tipo_usuario

def create_caso_prueba(db: Session, caso_prueba: schemas.CasoPruebaCreate):
    db_caso_prueba = models.CasoPrueba(**caso_prueba.dict())
    db.add(db_caso_prueba)
    db.commit()
    db.refresh(db_caso_prueba)
    return db_caso_prueba

def get_caso_prueba(db: Session, caso_prueba_id: int):
    return db.query(models.CasoPrueba).filter(models.CasoPrueba.id == caso_prueba_id).first()

def get_casos_prueba(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.CasoPrueba).offset(skip).limit(limit).all()

def update_caso_prueba(db: Session, caso_prueba_id: int, caso_prueba: schemas.CasoPruebaUpdate):
    db_caso_prueba = db.query(models.CasoPrueba).filter(models.CasoPrueba.id == caso_prueba_id).first()
    db_caso_prueba.paso_a_paso = caso_prueba.paso_a_paso
    db_caso_prueba.funcionalidad_id = caso_prueba.funcionalidad_id
    db_caso_prueba.so_id = caso_prueba.so_id
    db_caso_prueba.tipo_prueba_id = caso_prueba.tipo_prueba_id
    db_caso_prueba.pantalla_id = caso_prueba.pantalla_id
    db_caso_prueba.aplicacion_id = caso_prueba.aplicacion_id
    db.commit()
    db.refresh(db_caso_prueba)
    return db_caso_prueba

def delete_caso_prueba(db: Session, caso_prueba_id: int):
    db_caso_prueba = db.query(models.CasoPrueba).filter(models.CasoPrueba.id == caso_prueba_id).first()
    db.delete(db_caso_prueba)
    db.commit()
    return db_caso_prueba