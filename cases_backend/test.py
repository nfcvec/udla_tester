import time
import requests

BASE_URL = "http://localhost:8000"

def make_request(method, url, payload=None):
    headers = {'Content-type': 'application/json'}
    full_url = f"{BASE_URL}{url}"
    if method == "GET":
        response = requests.get(full_url, headers=headers)
    elif method == "POST":
        response = requests.post(full_url, headers=headers, json=payload)
    elif method == "PUT":
        response = requests.put(full_url, headers=headers, json=payload)
    elif method == "DELETE":
        response = requests.delete(full_url, headers=headers)
    print(f"{method} {full_url} - {response.status_code} - {response.elapsed.total_seconds()}s")
    response.raise_for_status()  # Levanta una excepción para códigos de estado HTTP 4xx/5xx


def test_create_aplicacion():
    url = "/aplicacion/"
    payload = {"nombre": "Aplicacion Test"}
    make_request("POST", url, payload)

def test_read_aplicaciones():
    url = "/aplicacion/"
    make_request("GET", url)

def test_read_aplicacion():
    aplicacion_id = 1  # Cambia esto por un ID válido
    url = f"/aplicacion/{aplicacion_id}"
    make_request("GET", url)

def test_update_aplicacion():
    aplicacion_id = 1  # Cambia esto por un ID válido
    url = f"/aplicacion/{aplicacion_id}"
    payload = {"nombre": "Aplicacion Updated"}
    make_request("PUT", url, payload)

def test_create_pantalla():
    url = "/pantalla/"
    payload = {"nombre": "Pantalla Test", "aplicacion_id": 1}
    make_request("POST", url, payload)

def test_read_pantallas():
    url = "/pantalla/"
    make_request("GET", url)

def test_read_pantalla():
    pantalla_id = 1  # Cambia esto por un ID válido
    url = f"/pantalla/{pantalla_id}"
    make_request("GET", url)

def test_update_pantalla():
    pantalla_id = 1  # Cambia esto por un ID válido
    url = f"/pantalla/{pantalla_id}"
    payload = {"nombre": "Pantalla Updated", "aplicacion_id": 1}
    make_request("PUT", url, payload)

def test_create_funcionalidad():
    url = "/funcionalidad/"
    payload = {"nombre": "Funcionalidad Test", "aplicacion_id": 1}
    make_request("POST", url, payload)

def test_read_funcionalidades():
    url = "/funcionalidad/"
    make_request("GET", url)

def test_read_funcionalidad():
    funcionalidad_id = 1  # Cambia esto por un ID válido
    url = f"/funcionalidad/{funcionalidad_id}"
    make_request("GET", url)

def test_update_funcionalidad():
    funcionalidad_id = 1  # Cambia esto por un ID válido
    url = f"/funcionalidad/{funcionalidad_id}"
    payload = {"nombre": "Funcionalidad Updated", "aplicacion_id": 1}
    make_request("PUT", url, payload)

def test_create_so():
    url = "/so/"
    payload = {"nombre": "SO Test", "aplicacion_id": 1}
    make_request("POST", url, payload)

def test_read_sos():
    url = "/so/"
    make_request("GET", url)

def test_read_so():
    so_id = 1  # Cambia esto por un ID válido
    url = f"/so/{so_id}"
    make_request("GET", url)

def test_update_so():
    so_id = 1  # Cambia esto por un ID válido
    url = f"/so/{so_id}"
    payload = {"nombre": "SO Updated", "aplicacion_id": 1}
    make_request("PUT", url, payload)

def test_create_tipo_prueba():
    url = "/tipo_prueba/"
    payload = {"nombre": "Tipo Prueba Test", "aplicacion_id": 1}
    make_request("POST", url, payload)

def test_read_tipos_prueba():
    url = "/tipo_prueba/"
    make_request("GET", url)

def test_read_tipo_prueba():
    tipo_prueba_id = 1  # Cambia esto por un ID válido
    url = f"/tipo_prueba/{tipo_prueba_id}"
    make_request("GET", url)

def test_update_tipo_prueba():
    tipo_prueba_id = 1  # Cambia esto por un ID válido
    url = f"/tipo_prueba/{tipo_prueba_id}"
    payload = {"nombre": "Tipo Prueba Updated", "aplicacion_id": 1}
    make_request("PUT", url, payload)

def test_create_tipo_usuario():
    url = "/tipo_usuario/"
    payload = {"nombre": "Tipo Usuario Test", "aplicacion_id": 1}
    make_request("POST", url, payload)

def test_read_tipos_usuario():
    url = "/tipo_usuario/"
    make_request("GET", url)

def test_read_tipo_usuario():
    tipo_usuario_id = 1  # Cambia esto por un ID válido
    url = f"/tipo_usuario/{tipo_usuario_id}"
    make_request("GET", url)

def test_update_tipo_usuario():
    tipo_usuario_id = 1  # Cambia esto por un ID válido
    url = f"/tipo_usuario/{tipo_usuario_id}"
    payload = {"nombre": "Tipo Usuario Updated", "aplicacion_id": 1}
    make_request("PUT", url, payload)

def test_create_caso_prueba():
    url = "/caso_prueba/"
    payload = {
        "paso_a_paso": "Paso a paso Test",
        "funcionalidad_id": 1,
        "so_id": 1,
        "tipo_prueba_id": 1,
        "pantalla_id": 1,
        "aplicacion_id": 1,
        "tipo_usuario_id": 1
    }
    make_request("POST", url, payload)

def test_read_casos_prueba():
    url = "/caso_prueba/"
    make_request("GET", url)

def test_read_caso_prueba():
    caso_prueba_id = 1  # Cambia esto por un ID válido
    url = f"/caso_prueba/{caso_prueba_id}"
    make_request("GET", url)

def test_update_caso_prueba():
    caso_prueba_id = 1  # Cambia esto por un ID válido
    url = f"/caso_prueba/{caso_prueba_id}"
    payload = {
        "paso_a_paso": "Paso a paso Updated",
        "funcionalidad_id": 1,
        "so_id": 1,
        "tipo_prueba_id": 1,
        "pantalla_id": 1,
        "aplicacion_id": 1,
        "tipo_usuario_id": 1
    }
    make_request("PUT", url, payload)

def test_delete_caso_prueba():
    caso_prueba_id = 1  # Cambia esto por un ID válido
    url = f"/caso_prueba/{caso_prueba_id}"
    make_request("DELETE", url)

def test_delete_tipo_usuario():
    tipo_usuario_id = 1  # Cambia esto por un ID válido
    url = f"/tipo_usuario/{tipo_usuario_id}"
    make_request("DELETE", url)

def test_delete_tipo_prueba():
    tipo_prueba_id = 1  # Cambia esto por un ID válido
    url = f"/tipo_prueba/{tipo_prueba_id}"
    make_request("DELETE", url)

def test_delete_so():
    so_id = 1  # Cambia esto por un ID válido
    url = f"/so/{so_id}"
    make_request("DELETE", url)

def test_delete_funcionalidad():
    funcionalidad_id = 1  # Cambia esto por un ID válido
    url = f"/funcionalidad/{funcionalidad_id}"
    make_request("DELETE", url)

def test_delete_pantalla():
    pantalla_id = 1  # Cambia esto por un ID válido
    url = f"/pantalla/{pantalla_id}"
    make_request("DELETE", url)

def test_delete_aplicacion():
    aplicacion_id = 1  # Cambia esto por un ID válido
    url = f"/aplicacion/{aplicacion_id}"
    make_request("DELETE", url)

if __name__ == "__main__":
    test_create_aplicacion()
    test_read_aplicaciones()
    test_read_aplicacion()
    test_update_aplicacion()
    test_create_pantalla()
    test_read_pantallas()
    test_read_pantalla()
    test_update_pantalla()
    test_create_funcionalidad()
    test_read_funcionalidades()
    test_read_funcionalidad()
    test_update_funcionalidad()
    test_create_so()
    test_read_sos()
    test_read_so()
    test_update_so()
    test_create_tipo_prueba()
    test_read_tipos_prueba()
    test_read_tipo_prueba()
    test_update_tipo_prueba()
    test_create_tipo_usuario()
    test_read_tipos_usuario()
    test_read_tipo_usuario()
    test_update_tipo_usuario()
    test_create_caso_prueba()
    test_read_casos_prueba()
    test_read_caso_prueba()
    test_update_caso_prueba()
    test_delete_caso_prueba()
    test_delete_tipo_usuario()
    test_delete_tipo_prueba()
    test_delete_so()
    test_delete_funcionalidad()
    test_delete_pantalla()
    test_delete_aplicacion()