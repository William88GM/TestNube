<h1>Test Nube</h1>
<br/>
<span>Ésta es una prueba técnica de Frontend</span>
<br/>
<br/>

<img src="./test-nube/public/mobile.webp" />


<h3>Pre requisitos</h3>
<br/>

<p>- Node.js instalado</p>
<p>- NPM instalado</p>
<br/>

<h3>Instalación</h3>
<br/>

<p>- Clonar el repositorio</p>
<p>- Ejecutar el comando `npm install` en la carpeta raíz del proyecto</p>
<p>- Ejecutar el comando `npm run dev` en la carpeta raíz del proyecto</p>
<br/>

<h3>Variables de entorno </h3>
<br/>
<p>En el archivo `.env.example` se encuentran las dos variables:</p>
<p>NEXT_PUBLIC_PAGEURL: Se refiere a la url base de la web</p>
<p>NEXT_PUBLIC_APIENDPOINT: Se refiere a la url base del backend</p>
<br/>

<h3>Navegación</h3>
<p>En el modo admin, luego de simular iniciar sesión, puedes hacer click sobre un manga y se abrirá una modal para editarlo:</p>
<p>- Arriba a la izquierda hay un botón para eliminar el manga</p>
<p>- Con un click en la imagen podrás subir una nueva y esta se optimizará a webp</p>
<p>- En los inputs del formulario se pueden editar los datos del manga</p>
<p>- En la parte inferior de la modal hay un botón para guardar los cambios, estos se enviarían al back en formato FormData</p>
<p>- Fuera de la modal, en la parte inferior derecha, hay un botón flotante para agregar un nuevo manga (abre una modal vacía)</p>
<br/>

<h4>Como el proyecto no está conectado a un backend, cada cambio fallará volverá al estado inicial luego de unos segundos</h4>
<span>Nota: El login y el logout reales se encuentran comentados</span>
<br/>

<h3>Desarrollo</h3>
<br/>

El proyecto está desarrollado en Next.js, por lo que puedes ver la documentación de Next.js mas abajo.
<br/>

<h3>Despliegue</h3>
<br/>

El proyecto se encuentra desplegado en Vercel.
Link: https://test-nube.vercel.app/
<br/>
<br/>
<h6>To do:</h6>
<p>Descomentar los fetch de login y logout</p>
<p>Ordenar los estilos de la app</p>
<p>Simplificar, componetizar y ordenar código</p>
<br/>
<h5>Documentación de Next.js</h5>
<br/>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
