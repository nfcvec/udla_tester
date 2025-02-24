import json
from sqlalchemy import asc, desc
from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy.orm import joinedload


def apply_filters(query, model, filters):
    if filters:
        for filter in filters:
            #validar que vengan todos los campos
            if 'field' not in filter.keys() or 'operator' not in filter.keys() or 'value' not in filter.keys():
                continue
            field = filter['field']
            
            if field == 'aplicacion':
                model = models.Aplicacion
                field = 'nombre'
                query = query.join(models.Aplicacion)
                
            elif field == 'pantalla':
                model = models.Pantalla
                field = 'nombre'
                query = query.join(models.Pantalla)
                
            elif field == 'funcionalidad':
                model = models.Funcionalidad
                field = 'nombre'
                query = query.join(models.Funcionalidad)
                
            elif field == 'so':
                model = models.SO
                field = 'nombre'
                query = query.join(models.SO)
                
            elif field == 'tipo_prueba':
                model = models.TipoPrueba
                field = 'nombre'
                query = query.join(models.TipoPrueba)
                
            elif field == 'tipo_usuario':
                model = models.TipoUsuario
                field = 'nombre'
                query = query.join(models.TipoUsuario)
                
            operator = filter['operator']
            value = filter.get('value', '')
            if operator == 'equals':
                query = query.filter(getattr(model, field) == value)
            elif operator == 'doesNotEqual':
                query = query.filter(getattr(model, field) != value)
            elif operator == 'contains':
                query = query.filter(getattr(model, field).like(f'%{value}%'))
            elif operator == 'doesNotContain':
                query = query.filter(~getattr(model, field).like(f'%{value}%'))
            elif operator == 'startsWith':
                query = query.filter(getattr(model, field).like(f'{value}%'))
            elif operator == 'endsWith':
                query = query.filter(getattr(model, field).like(f'%{value}'))
            elif operator == 'isEmpty':
                query = query.filter(getattr(model, field) == '')
            elif operator == 'isNotEmpty':
                query = query.filter(getattr(model, field) != '')
            elif operator == 'isAnyOf':
                query = query.filter(getattr(model, field).in_(value))
    
    return query

def apply_sort(query, model, sorts: list):
    # [{"field":"funcionalidad","sort":"asc"}]
    if sorts:
        for sort in sorts:
            if 'field' not in sort.keys() or 'sort' not in sort.keys():
                continue
            field = sort['field']
            sort_order = sort['sort']
            if field == 'aplicacion':
                model = models.Aplicacion
                field = 'nombre'
            elif field == 'pantalla':
                model = models.Pantalla
                field = 'nombre'
            elif field == 'funcionalidad':
                model = models.Funcionalidad
                field = 'nombre'
            elif field == 'so':
                model = models.SO
                field = 'nombre'
            elif field == 'tipo_prueba':
                model = models.TipoPrueba
                field = 'nombre'
            elif field == 'tipo_usuario':
                model = models.TipoUsuario
                field = 'nombre'
            if sort_order == 'desc':
                query = query.order_by(desc(getattr(model, field)))
            else:
                query = query.order_by(asc(getattr(model, field)))
    return query

def apply_pagination(query, pagination: dict):
    #{"pageSize":5,"page":0}
    if pagination:
        page = pagination.get('page', 0)
        page_size = pagination.get('pageSize', 10)
        query = query.offset(page * page_size).limit(page_size)
    return query
    

def create_aplicacion(db: Session, aplicacion: schemas.AplicacionCreate):
    db_aplicacion = models.Aplicacion(**aplicacion.dict())
    db.add(db_aplicacion)
    db.commit()
    db.refresh(db_aplicacion)
    return db_aplicacion

def get_aplicacion(db: Session, aplicacion_id: int):
    return db.query(models.Aplicacion).filter(models.Aplicacion.id == aplicacion_id).first()

def get_aplicaciones(db: Session, sorts: list = [], pagination: dict = {}, filters: list = []):
    query = db.query(models.Aplicacion)
    query = apply_filters(query, models.Aplicacion, filters)
    query = apply_sort(query, models.Aplicacion, sorts)
    query = apply_pagination(query, pagination)
    aplicaciones = query.all()
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
    related_models = [
        (models.Pantalla, "Pantalla"),
        (models.Funcionalidad, "Funcionalidad"),
        (models.SO, "SO"),
        (models.TipoPrueba, "TipoPrueba"),
        (models.TipoUsuario, "TipoUsuario"),
        (models.CasoPrueba, "CasoPrueba")
    ]
    
    for model, name in related_models:
        if db.query(model).filter(getattr(model, 'aplicacion_id') == aplicacion_id).count() > 0:
            raise Exception(f"No se puede eliminar la aplicación porque está referenciada en {name}")
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

def get_pantallas(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filters: list = []):
    query = db.query(models.Pantalla).join(models.Aplicacion)
    query = apply_filters(query, models.Pantalla, filters)            
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(models.Pantalla, sort_by)))
    else:
        query = query.order_by(asc(getattr(models.Pantalla, sort_by)))
    pantallas = query.offset(skip).limit(limit).all()
    total = query.count()
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
    related_models = [
        (models.CasoPrueba, "CasoPrueba")
    ]
    for model, name in related_models:
        if db.query(model).filter(getattr(model, 'pantalla_id') == pantalla_id).count() > 0:
            raise Exception(f"No se puede eliminar la pantalla porque está referenciada en {name}")
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

def get_funcionalidades(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filters: list = []):
    query = db.query(models.Funcionalidad).options(
        joinedload(models.Funcionalidad.aplicacion)
    )
    query = apply_filters(query, models.Funcionalidad, filters)
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
    if db.query(models.CasoPrueba).filter(models.CasoPrueba.funcionalidad_id == funcionalidad_id).count() > 0:
        raise Exception("No se puede eliminar la funcionalidad porque está referenciada en CasoPrueba")
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

def get_sos(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filters: list = []):
    query = db.query(models.SO).options(
        joinedload(models.SO.aplicacion)
    )
    query = apply_filters(query, models.SO, filters)
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
    if db.query(models.CasoPrueba).filter(models.CasoPrueba.so_id == so_id).count() > 0:
        raise Exception("No se puede eliminar el SO porque está referenciado en CasoPrueba")
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

def get_tipos_prueba(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filters: list = []):
    query = db.query(models.TipoPrueba).options(
        joinedload(models.TipoPrueba.aplicacion)
    )
    query = apply_filters(query, models.TipoPrueba, filters)
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
    if db.query(models.CasoPrueba).filter(models.CasoPrueba.tipo_prueba_id == tipo_prueba_id).count() > 0:
        raise Exception("No se puede eliminar el tipo de prueba porque está referenciado en CasoPrueba")
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


def get_tipos_usuario(db: Session, skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filters: list = []):
    query = db.query(models.TipoUsuario).options(
        joinedload(models.TipoUsuario.aplicacion)
    )
    query = apply_filters(query, models.TipoUsuario, filters)
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
    if db.query(models.CasoPrueba).filter(models.CasoPrueba.tipo_usuario_id == tipo_usuario_id).count() > 0:
        raise Exception("No se puede eliminar el tipo de usuario porque está referenciado en CasoPrueba")
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
        joinedload(models.CasoPrueba.aplicacion),
        joinedload(models.CasoPrueba.tipo_usuario)  # Asegurarse de cargar tipo_usuario
    ).filter(models.CasoPrueba.id == caso_prueba_id).first()


def get_casos_prueba(db: Session, sorts: list = [], pagination: dict = {}, filters: list = []):
    query = db.query(models.CasoPrueba).options(
        joinedload(models.CasoPrueba.funcionalidad),
        joinedload(models.CasoPrueba.so),
        joinedload(models.CasoPrueba.tipo_prueba),
        joinedload(models.CasoPrueba.pantalla),
        joinedload(models.CasoPrueba.aplicacion)
    )
    query = apply_filters(query, models.CasoPrueba, filters)
    query = apply_sort(query, models.CasoPrueba, sorts)
    query = apply_pagination(query, pagination)
    casos_prueba = query.all()
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
        joinedload(models.CasoPrueba.aplicacion),
        joinedload(models.CasoPrueba.tipo_usuario)
    ).filter(models.CasoPrueba.id == caso_prueba_id).first()
    if db_caso_prueba:
        db.delete(db_caso_prueba)
        db.commit()
    return db_caso_prueba