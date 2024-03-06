# Tripleten Backend

Este repositorio contiene todo el código relacionado con el backend de **Around**. Aquí se encuentra la lógica para el manejo de la API, así como los esquemas para el almacenamiento de la información de usuario y la creación y guardado de tarjetas.

## Características

- **API RESTful**: Implementamos una API RESTful para el intercambio de datos entre el cliente y el servidor.

- **MongoDB (Mongoose)**: Utilizamos MongoDB como nuestra base de datos, y Mongoose como la capa de abstracción para facilitar el manejo de datos.

- **Autenticación con JWT**: Implementamos autenticación basada en tokens JWT (JSON Web Tokens) para garantizar la seguridad de la aplicación.

- **Variables de entorno**: Hacemos uso de variables de entorno para la configuración de valores sensibles, como las claves secretas de JWT.

## Configuración

1. Instalación de dependencias: Antes de ejecutar el backend, asegúrate de instalar todas las dependencias necesarias ejecutando npm install.

2. Configuración de variables de entorno: Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias. Por ejemplo:

```js
NODE_ENV = 'Tu-Firma';
JWT_SECRET = tu - clave - secreta - para - JWT;
```

## Ejecución

Una vez configurado, puedes ejecutar el backend utilizando el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor en el puerto especificado en las variables de entorno (PORT). Puedes acceder a la API a través de la URL http://localhost:3000 (o el puerto que hayas especificado).

## Estructura del Proyecto

- **/models:** Contiene los esquemas de Mongoose para la definición de modelos de datos.

- **/routes:** Aquí se encuentran los controladores de ruta para el manejo de las solicitudes HTTP.

- **/controllers:** Contiene la lógica de controladores para procesar las solicitudes recibidas por las rutas.

- **/middlewares:** Almacena los middlewares utilizados en la aplicación.

- **/utils:** Contiene utilidades y constantes utilizadas en el proyecto.

- **/logs:** Carpeta donde se guardan los registros de solicitudes y errores.
