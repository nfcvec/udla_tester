# Contents of /fastapi-backend/fastapi-backend/app/routers/__init__.py

from fastapi import APIRouter
from . import aplicacion, pantalla, funcionalidad, so, tipo_prueba, tipo_usuario, caso_prueba, proceso, testers_proceso, funcionalidades_proceso

router = APIRouter()

router.include_router(aplicacion.router, prefix="/aplicacion", tags=["aplicacion"])
router.include_router(pantalla.router, prefix="/pantalla", tags=["pantalla"])
router.include_router(funcionalidad.router, prefix="/funcionalidad", tags=["funcionalidad"])
router.include_router(so.router, prefix="/so", tags=["so"])
router.include_router(tipo_prueba.router, prefix="/tipo_prueba", tags=["tipo_prueba"])
router.include_router(tipo_usuario.router, prefix="/tipo_usuario", tags=["tipo_usuario"])
router.include_router(caso_prueba.router, prefix="/caso_prueba", tags=["caso_prueba"])
router.include_router(proceso.router, prefix="/proceso", tags=["proceso"])
router.include_router(testers_proceso.router, prefix="/testers_proceso", tags=["testers_proceso"])
router.include_router(funcionalidades_proceso.router, prefix="/funcionalidades_proceso", tags=["funcionalidades_proceso"])
