# Contents of /fastapi-backend/fastapi-backend/app/routers/__init__.py

from fastapi import APIRouter
from . import aplicacion, pantalla, funcionalidad, so, tipo_prueba, tipo_usuario, caso_prueba

router = APIRouter()

router.include_router(aplicacion.router, prefix="/aplicacion", tags=["aplicacion"])
router.include_router(pantalla.router, prefix="/pantalla", tags=["pantalla"])
router.include_router(funcionalidad.router, prefix="/funcionalidad", tags=["funcionalidad"])
router.include_router(so.router, prefix="/so", tags=["so"])
router.include_router(tipo_prueba.router, prefix="/tipo_prueba", tags=["tipo_prueba"])
router.include_router(tipo_usuario.router, prefix="/tipo_usuario", tags=["tipo_usuario"])
router.include_router(caso_prueba.router, prefix="/caso_prueba", tags=["caso_prueba"])