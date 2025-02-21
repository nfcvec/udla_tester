from sqlalchemy import asc, desc
from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy.orm import joinedload

def create_aplicacion(db: Session, aplicacion: schemas.AplicacionCreate):
    db_aplicacion = models.Aplicacion(**aplicacion.dict())
    db.add(db_aplicacion)
    db.commit()
    db.refresh(db_aplicacion)
    return db_aplicacion

def get_aplicacion(db: Session, aplicacion_id: int):
    return db.query(models.Aplicacion).filter(models.Aplicacion.id == aplicacion_id).first()

def get_aplicaciones(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None):
    query = db.query(models.Aplicacion)
    if filter_column and filter_value:
        query = query.filter(getattr(models.Aplicacion, filter_column).like(f'%{filter_value}%'))
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.Aplicacion, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.Aplicacion, sort_by)))
    aplicaciones = query.offset(skip).limit(limit).all()
    total = db.query(models.Aplicacion).count()
    return aplicaciones, total

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

def get_pantallas(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filters: dict = {}):
    query = db.query(models.Pantalla).join(models.Aplicacion)
    if filters:
        for key, value in filters.items():
            query = query.filter(getattr(models.Pantalla, key).like(f'%{value}%'))
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.Pantalla, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.Pantalla, sort_by)))
    pantallas = query.offset(skip).limit(limit).all()
    total = db.query(models.Pantalla).count()
    return pantallas, total

def update_pantalla(db: Session, pantalla_id: int, pantalla: schemas.PantallaUpdate):
    db_pantalla = db.query(models.Pantalla).filter(models.Pantalla.id == pantalla_id).first()
    db_pantalla.nombre = pantalla.nombre
    db_pantalla.aplicacion_id = pantalla.aplicacion_id
    db.commit()
    db.refresh(db_pantalla)
    return db_pantalla

def delete_pantalla(db: Session, pantalla_id: int):
    db_pantalla = db.query(models.Pantalla).options(
        joinedload(models.Pantalla.aplicacion)
    ).filter(models.Pantalla.id == pantalla_id).first()
    if db_pantalla:
        db.delete(db_pantalla)
        db.commit()
    return db_pantalla

def create_funcionalidad(db: Session, funcionalidad: schemas.FuncionalidadCreate):
    db_aplicacion = db.query(models.Aplicacion).filter(models.Aplicacion.id == funcionalidad.aplicacion_id).first()
    db_funcionalidad = models.Funcionalidad(
        nombre=funcionalidad.nombre,
        aplicacion=db_aplicacion
    )
    db.add(db_funcionalidad)
    db.commit()
    db.refresh(db_funcionalidad)
    return db_funcionalidad

def get_funcionalidad(db: Session, funcionalidad_id: int):
    return db.query(models.Funcionalidad).options(
        joinedload(models.Funcionalidad.aplicacion)
    ).filter(models.Funcionalidad.id == funcionalidad_id).first()

def get_funcionalidades(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None):
    query = db.query(models.Funcionalidad).options(
        joinedload(models.Funcionalidad.aplicacion)
    )
    if filter_column and filter_value:
        query = query.filter(getattr(models.Funcionalidad, filter_column).like(f'%{filter_value}%'))
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.Funcionalidad, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.Funcionalidad, sort_by)))
    funcionalidades = query.offset(skip).limit(limit).all()    
    total = db.query(models.Funcionalidad).count()
    return funcionalidades, total

def update_funcionalidad(db: Session, funcionalidad_id: int, funcionalidad: schemas.FuncionalidadUpdate):
    db_funcionalidad = db.query(models.Funcionalidad).filter(models.Funcionalidad.id == funcionalidad_id).first()
    db_funcionalidad.nombre = funcionalidad.nombre
    db_funcionalidad.aplicacion_id = funcionalidad.aplicacion_id
    db.commit()
    db.refresh(db_funcionalidad)
    return db_funcionalidad

def delete_funcionalidad(db: Session, funcionalidad_id: int):
    db_funcionalidad = db.query(models.Funcionalidad).options(
        joinedload(models.Funcionalidad.aplicacion)
    ).filter(models.Funcionalidad.id == funcionalidad_id).first()
    if db_funcionalidad:
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
    return db.query(models.SO).options(
        joinedload(models.SO.aplicacion)
    ).filter(models.SO.id == so_id).first()

def get_sos(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None):
    query = db.query(models.SO).options(
        joinedload(models.SO.aplicacion)
    )
    if filter_column and filter_value:
        query = query.filter(getattr(models.SO, filter_column).like(f'%{filter_value}%'))
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.SO, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.SO, sort_by)))
    sos = query.offset(skip).limit(limit).all()
    total = db.query(models.SO).count()
    return sos, total

def update_so(db: Session, so_id: int, so: schemas.SOUpdate):
    db_so = db.query(models.SO).filter(models.SO.id == so_id).first()
    db_so.nombre = so.nombre
    db_so.aplicacion_id = so.aplicacion_id
    db.commit()
    db.refresh(db_so)
    return db_so

def delete_so(db: Session, so_id: int):
    db_so = db.query(models.SO).options(
        joinedload(models.SO.aplicacion)
    ).filter(models.SO.id == so_id).first()
    if db_so:
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
    return db.query(models.TipoPrueba).options(
        joinedload(models.TipoPrueba.aplicacion)
    ).filter(models.TipoPrueba.id == tipo_prueba_id).first()

def get_tipos_prueba(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None):
    query = db.query(models.TipoPrueba).options(
        joinedload(models.TipoPrueba.aplicacion)
    )
    if filter_column and filter_value:
        query = query.filter(getattr(models.TipoPrueba, filter_column).like(f'%{filter_value}%'))
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.TipoPrueba, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.TipoPrueba, sort_by)))
    tipos_prueba = query.offset(skip).limit(limit).all()
    total = db.query(models.TipoPrueba).count()
    return tipos_prueba, total

def update_tipo_prueba(db: Session, tipo_prueba_id: int, tipo_prueba: schemas.TipoPruebaUpdate):
    db_tipo_prueba = db.query(models.TipoPrueba).filter(models.TipoPrueba.id == tipo_prueba_id).first()
    db_tipo_prueba.nombre = tipo_prueba.nombre
    db_tipo_prueba.aplicacion_id = tipo_prueba.aplicacion_id
    db.commit()
    db.refresh(db_tipo_prueba)
    return db_tipo_prueba

def delete_tipo_prueba(db: Session, tipo_prueba_id: int):
    db_tipo_prueba = db.query(models.TipoPrueba).options(
        joinedload(models.TipoPrueba.aplicacion)
    ).filter(models.TipoPrueba.id == tipo_prueba_id).first()
    if db_tipo_prueba:
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
    return db.query(models.TipoUsuario).options(
        joinedload(models.TipoUsuario.aplicacion)
    ).filter(models.TipoUsuario.id == tipo_usuario_id).first()


def get_tipos_usuario(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None):
    query = db.query(models.TipoUsuario).options(
        joinedload(models.TipoUsuario.aplicacion)
    )
    if filter_column and filter_value:
        query = query.filter(getattr(models.TipoUsuario, filter_column).like(f'%{filter_value}%'))
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.TipoUsuario, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.TipoUsuario, sort_by)))
    tipos_usuario = query.offset(skip).limit(limit).all()
    total = db.query(models.TipoUsuario).count()
    return tipos_usuario, total

def update_tipo_usuario(db: Session, tipo_usuario_id: int, tipo_usuario: schemas.TipoUsuarioUpdate):
    db_tipo_usuario = db.query(models.TipoUsuario).filter(models.TipoUsuario.id == tipo_usuario_id).first()
    db_tipo_usuario.nombre = tipo_usuario.nombre
    db_tipo_usuario.aplicacion_id = tipo_usuario.aplicacion_id
    db.commit()
    db.refresh(db_tipo_usuario)
    return db_tipo_usuario

def delete_tipo_usuario(db: Session, tipo_usuario_id: int):
    db_tipo_usuario = db.query(models.TipoUsuario).options(
        joinedload(models.TipoUsuario.aplicacion)
    ).filter(models.TipoUsuario.id == tipo_usuario_id).first()
    if db_tipo_usuario:
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
    return db.query(models.CasoPrueba).options(
        joinedload(models.CasoPrueba.funcionalidad),
        joinedload(models.CasoPrueba.so),
        joinedload(models.CasoPrueba.tipo_prueba),
        joinedload(models.CasoPrueba.pantalla),
        joinedload(models.CasoPrueba.aplicacion)
    ).filter(models.CasoPrueba.id == caso_prueba_id).first()


def get_casos_prueba(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None):
    query = db.query(models.CasoPrueba).options(
        joinedload(models.CasoPrueba.funcionalidad),
        joinedload(models.CasoPrueba.so),
        joinedload(models.CasoPrueba.tipo_prueba),
        joinedload(models.CasoPrueba.pantalla),
        joinedload(models.CasoPrueba.aplicacion)
    )
    if filter_column and filter_value:
        query = query.filter(getattr(models.CasoPrueba, filter_column).like(f'%{filter_value}%'))
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.CasoPrueba, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.CasoPrueba, sort_by)))
    casos_prueba = query.offset(skip).limit(limit).all()
    total = db.query(models.CasoPrueba).count()
    return casos_prueba, total

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
    db_caso_prueba = db.query(models.CasoPrueba).options(
        joinedload(models.CasoPrueba.funcionalidad),
        joinedload(models.CasoPrueba.so),
        joinedload(models.CasoPrueba.tipo_prueba),
        joinedload(models.CasoPrueba.pantalla),
        joinedload(models.CasoPrueba.aplicacion)
    ).filter(models.CasoPrueba.id == caso_prueba_id).first()
    if db_caso_prueba:
        db.delete(db_caso_prueba)
        db.commit()
    return db_caso_prueba