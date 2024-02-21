# Proyecto React: Alrededor de los Estados Unidos

## Descripción general

### Introducción

Alrededor de los Estados Unidos es la evolución de nuestro proyecto 4, en el cual TripleTen nos brindó la oportunidad de comenzar a trabajar con JavaScript. En este proyecto, el desafío es refactorizar nuestra red social y migrarla a React. Aquí, en lugar de utilizar directamente HTML, creamos componentes de React utilizando archivos JSX para construir un esqueleto que se integra con HTML.

Este proyecto presenta varios retos, ya que implementamos la funcionalidad de la página mediante el paradigma declarativo, abandonando el enfoque imperativo al que estábamos acostumbrados con JavaScript vanilla. De manera sorprendente, con unas pocas líneas de código logramos abrir y cerrar los popups de nuestra red social. Conectamos las solicitudes a la API de manera sencilla y, aunque no fue fácil, logramos adaptarnos a React. Una vez más, refactorizamos nuestro código para hacerlo más limpio y fácil de mantener.

### Herramientas

- React
- CSS
- JSX
- Flexbox (CSS)
- Metodología BEM (Yandex)
- Media Queries

**React:** Utilizamos Create React App (CRA) para desarrollar nuestra red social. Cada sección de nuestra página es un componente JSX, lo que nos ayudó a mantener el código ordenado. El archivo App.js contiene la estructura principal de la página, incluyendo el encabezado (Header), el contenido principal (Main) y el pie de página (Footer).

**Main.jsx:** En este archivo se encuentran los componentes que conforman todas las secciones de la página. Cada componente tiene argumentos específicos para activar las funcionalidades de apertura y cierre. También utilizamos los Hooks de React (useState y useEffect) para establecer los estados iniciales y realizar solicitudes a la API.

**CSS:** Migramos las clases de estilo de nuestro proyecto anterior, manteniendo la estructura de carpetas y archivos, dejando la carpeta Blocks para futuras actualizaciones.

### Próximas Actualizaciones

En futuras actualizaciones, planeamos implementar las siguientes características:

- Confirmación de eliminación al borrar una tarjeta.
- Edición del nombre y descripción del perfil.
- Adición de nuevas tarjetas a la red social.
- Implementación del contador de "likes".

## Repositorio

Si deseas explorar el código y los detalles de nuestro proyecto, puedes visitar el repositorio en GitHub: [Enlace al Repositorio](https://github.com/SoyIsabelMM/around-react_es)
