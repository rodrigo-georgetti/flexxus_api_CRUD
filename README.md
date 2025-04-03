

📌 API de Gestión de Artículos - Prueba técnica backend Flexxus

📖 Descripción

Esta API permite gestionar artículos, incluyendo su creación, actualización, eliminación y búsqueda mediante filtros. También registro de usuarios y login

🚀 Instalación

1️⃣ Clonar el repositorio

git clone https://github.com/rodrigo-georgetti/flexxus_api_CRUD
cd tu-repositorio

2️⃣ Instalar dependencias

npm install

3️⃣ Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega:

PORT=
JWT_SECRET=
DATABASE_URL=

4️⃣ Iniciar el servidor

npm run dev  # Para desarrollo
npm start    # Para producción

📡 Endpoints

🔐 Autenticación

Esta API utiliza JWT (Bearer Token) para la autenticación. Debes incluir un token en las peticiones protegidas.

Ejemplo en Swagger:

Authorization: Bearer tu_token_aqui

🔑 Registro de usuario

POST /api/users/register

🔹 Cuerpo de la petición (JSON):

{
  "user_name": "usuario123",
  "password": "contraseñaSegura"
}

👌 Respuesta exitosa (201):

{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "64f6c2e5a917c4b7e5d39b3d",
    "user_name": "usuario123"
  }
}

🔑 Login de usuario

POST /api/users/login

🔹 Cuerpo de la petición (JSON):

{
  "user_name": "usuario123",
  "password": "contraseñaSegura"
}

👌 Respuesta exitosa (200):

{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

📌 Obtener artículos con filtros

GET /api/articles

🔹 Parámetros opcionales:

Parámetro

Tipo

Descripción

activation_status

boolean

Filtra por estado de activación (true o false).

name

string

Filtra por nombre del artículo.

exact

boolean

Si es true, busca el nombre exacto.

✅ Respuesta exitosa (200)

[
  {
    "id": "64f6c2e5a917c4b7e5d39b3a",
    "name": "Laptop Dell XPS",
    "brand": "Dell",
    "activation_status": true,
    "modification_date": "2024-03-30T12:45:00Z"
  }
]

➕ Crear un artículo

POST /api/articles

🔹 Cuerpo de la petición (JSON)

{
  "name": "Mouse Logitech G502",
  "brand": "Logitech"
}

✅ Respuesta exitosa (201)

{
  "id": "64f6c2e5a917c4b7e5d39b3b",
  "name": "Mouse Logitech G502",
  "brand": "Logitech",
  "activation_status": true,
  "modification_date": "2024-03-30T12:50:00Z"
}

🔄 Actualizar un artículo

PUT /api/articles/:id

🔹 Cuerpo de la petición (JSON)

{
  "name": "Teclado Mecánico RGB",
  "brand": "Corsair",
  "activation_status": true
}

✅ Respuesta exitosa (200)

{
  "id": "64f6c2e5a917c4b7e5d39b3c",
  "name": "Teclado Mecánico RGB",
  "brand": "Corsair",
  "activation_status": true,
  "modification_date": "2024-03-30T13:00:00Z"
}

❌ Desactivar un artículo

DELETE /api/articles/:id

✅ Respuesta exitosa (200)

{
  "message": "Artículo desactivado exitosamente"
}

📖 Documentación Swagger

Puedes ver y probar los endpoints desde Swagger UI.

🔗 Acceder a la documentación: https://flexxus-api-crud.onrender.com/api/docs
🛠 Tecnologías utilizadas

Node.js con Express.js

Sequelize para la base de datos

JWT para autenticación

Swagger para documentación

📝 Autor

Desarrollado por Rodrigo Georgetti - 2025 🚀