from fastapi import FastAPI
from app.api import aplicacion, tipo_usuario, tipo_prueba, so, pantalla, item, funcionalidad, caso_prueba
from app.db.session import init_db

app = FastAPI()

# Inicializa la base de datos
init_db()

app.include_router(aplicacion.router, prefix="/aplicaciones", tags=["aplicaciones"])
app.include_router(tipo_usuario.router, prefix="/tipos_usuario", tags=["tipos_usuario"])
app.include_router(tipo_prueba.router, prefix="/tipos_prueba", tags=["tipos_prueba"])
app.include_router(so.router, prefix="/sos", tags=["sos"])
app.include_router(pantalla.router, prefix="/pantallas", tags=["pantallas"])
app.include_router(item.router, prefix="/items", tags=["items"])
app.include_router(funcionalidad.router, prefix="/funcionalidades", tags=["funcionalidades"])
app.include_router(caso_prueba.router, prefix="/casos_prueba", tags=["casos_prueba"])

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de UDLA Tester"}