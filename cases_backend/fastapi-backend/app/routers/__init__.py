# Contents of /fastapi-backend/fastapi-backend/app/routers/__init__.py

from fastapi import APIRouter

router = APIRouter()

from .aplicacion import router as aplicacion_router
from .pantalla import router as pantalla_router
from .funcionalidad import router as funcionalidad_router
from .so import router as so_router
from .tipo_prueba import router as tipo_prueba_router
from .tipo_usuario import router as tipo_usuario_router
from .caso_prueba import router as caso_prueba_router

router.include_router(aplicacion_router, prefix="/aplicacion", tags=["Aplicacion"])
router.include_router(pantalla_router, prefix="/pantalla", tags=["Pantalla"])
router.include_router(funcionalidad_router, prefix="/funcionalidad", tags=["Funcionalidad"])
router.include_router(so_router, prefix="/so", tags=["SO"])
router.include_router(tipo_prueba_router, prefix="/tipo_prueba", tags=["TipoPrueba"])
router.include_router(tipo_usuario_router, prefix="/tipo_usuario", tags=["TipoUsuario"])
router.include_router(caso_prueba_router, prefix="/caso_prueba", tags=["CasoPrueba"])