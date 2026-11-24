# Hoshino Repair – Sistema Web de Gestión

## Descripción del proyecto

**Hoshino Repair** es un proyecto orientado al diseño y desarrollo de un sistema web integral para digitalizar y optimizar la gestión operativa de la empresa, mejorando principalmente la experiencia de los clientes y la administración de los servicios ofrecidos.

La propuesta surge ante la necesidad de reemplazar los métodos actuales de organización, basados en anotaciones en papel y coordinación mediante WhatsApp, por una plataforma centralizada que permita gestionar la información de manera más eficiente, segura y organizada.

El sistema busca mejorar la comunicación con los clientes, facilitar el seguimiento de reparaciones y reservas, y proporcionar herramientas que acompañen el crecimiento de la empresa.

## Objetivos del proyecto

- Digitalizar y optimizar la gestión de clientes y dispositivos.
- Mejorar la experiencia y confianza de los clientes.
- Implementar un sistema de turnos y reservas.
- Facilitar el seguimiento de reparaciones.
- Incorporar herramientas para la administración de productos y stock.
- Centralizar la información mediante una base de datos.
- Mejorar la organización interna y la eficiencia operativa de la empresa.

## Funcionalidades principales

El sistema contempla los siguientes módulos:

- **Gestión de usuarios:** Registro, inicio de sesión y recuperación de contraseñas.
- **Gestión de dispositivos:** Administración de equipos, reparaciones y reservas.
- **Chatbot:** Atención y asistencia general para los usuarios potenciada por IA.
- **Tienda:** Visualización de productos, catálogo, filtros y consulta de disponibilidad de stock.
- **Página de informacion de la empresa:** Información institucional y presentación de los servicios de la empresa.
- **Garantías y políticas:** Consulta de garantías, términos, condiciones e información relevante.

## Tecnologías y herramientas

Para el desarrollo del proyecto se contemplan las siguientes tecnologías y herramientas:

| Tecnología | Utilización |
|---|---|
| React | Desarrollo de la interfaz de usuario (Frontend) |
| TypeScript | Lenguaje de programación principal (JSX de React) |
| Node.js | Entorno de ejecución para el Backend y gestión de peticiones. |
| MongoDB | Almacenamiento de información y archivos de gran tamaño. |
| Visual Studio Code | Entorno de desarrollo (IDE) |
| GitHub | Control de versiones y alojamiento del código. |
| Render | Despliegue y alojamiento del servidor web. |

## Entorno de desarrollo

El proyecto se desarrolla utilizando Windows 10/11 como sistema operativo de trabajo y Visual Studio Code como entorno principal de programación.

Se contempla la compatibilidad de la aplicación con los navegadores web más utilizados, como Google Chrome, Microsoft Edge, Mozilla Firefox, Brave y Opera.

Para las primeras etapas de desarrollo y pruebas se consideran GitHub y Render como plataformas de alojamiento y despliegue, con la posibilidad de implementar un servidor propio en futuras etapas.

## Equipo de desarrollo

Proyecto realizado por:

- Lucas Martinez
- Tobías Noba
- Agustín Casal
- Alejo Fink

## Estado del proyecto

El proyecto se encuentra en la etapa final del desarrollo, ya empezado el testing de la Web y corrigiendo errores. Tambien comenzando a anotar ideas y mejoras para una proxima version.

## Proyección a futuro

Se busca consolidar una plataforma integral que permita a Hoshino Repair optimizar sus procesos internos, mejorar la atención al cliente y contar con una infraestructura tecnológica que facilite su crecimiento y expansión dentro del país.

## Como instalar y ejecutar el proyecto

1. Clonar el repo o En la parte superior de los archivos del Repositorio, desplegar el boton "Code" y descargar el ZIP del Repositorio.
2. Extraer el Archivo y dirigirse a la carpeta "/HoshinoWeb/HoshinoWeb" (donde se ve la carpeta "00 HoshinoBackend").
3. Es necesario abrir dos terminales, una en la carpeta "/HoshinoWeb/HoshinoWeb" y otra en "/00 HoshinoBackend".
4. En la terminal de "Hoshino Web" escribir el comando "npm i" y cuando termina de cargar, continuar con el comando "npm run dev". Esto correra el servidor Frontend.
5. En la terminal de "Hoshino Backend" escribir el comando "npm i" y cuando termina de cargar, continuar con, el comando "npm run start". Esto correra el servidor Backend.
6. Finalmente, en la terminal del Frontend, escribir "o" y presionar enter. Asi se le abrira la pestaña de Hoshino Web en su navegador de preferencia.