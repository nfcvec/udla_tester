# Contents of /fastapi-backend/fastapi-backend/app/__init__.py

from fastapi import FastAPI

app = FastAPI()

from .routers import aplicacion, pantalla, funcionalidad, so, tipo_prueba, tipo_usuario, caso_prueba, funcionalidades_proceso, testers_proceso, proceso

app.include_router(aplicacion.router)
app.include_router(pantalla.router)
app.include_router(funcionalidad.router)
app.include_router(so.router)
app.include_router(tipo_prueba.router)
app.include_router(tipo_usuario.router)
app.include_router(caso_prueba.router)
app.include_router(funcionalidades_proceso.router)
app.include_router(testers_proceso.router)
app.include_router(proceso.router)
