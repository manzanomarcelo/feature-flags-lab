# Feature Flags Learning Lab

Este proyecto es un laboratorio práctico para entender cómo usar **feature flags** dentro de un flujo de trabajo DevOps simple.

La idea principal del lab es aprender cómo una aplicación puede tener una funcionalidad ya incluida en el código, pero todavía no visible para los usuarios.

En este caso, la funcionalidad es un **Beta Dashboard**.

---

## Objetivo del proyecto

El objetivo es construir una aplicación web simple donde una sección beta se muestra u oculta dependiendo del valor de una feature flag.

La aplicación usa:

- Node.js
- Express
- HTML, CSS y JavaScript
- Un archivo `flags.json` como configuración
- GitHub Actions para CI
- Playwright para pruebas E2E
- GitHub Codespaces como entorno de desarrollo

---

## Arquitectura del lab

La aplicación funciona así:

```text
Frontend
  ↓ fetch("/api/features")
Backend Express
  ↓ lee flags.json
Devuelve JSON
  ↓
Frontend decide mostrar u ocultar la sección beta

```
## Qué aprendí con este LAB

- Cuando usás TBD branching la idea principal es hacer cambios pequeños, mergear rápido y eliminar la rama usada para realizar los cambios. Las ramas tienen una corta vida en este tipo de branching. 
- Cuando trabajás con TBD las feature flag son muy importantes porque te permiten tener el código integrado en la rama main durante el runtime, sin necesidad de redeploy y esto optimiza tiempo y recursos. 
- La feature flag te permite controlar los cambios de "deploy" y "release", cuando se hacen cambios en el código sobre main sería un deploy pero al no cambiar el estado de la feature flag y no estar visible para el usuario, este nuevo feature no se convierte en release todavía. 
- La otra ventaja de usar feature flags es que te permite hacer un rollback si hay algún problema al momento de hacer el release y podés volver al estado anterior de comportamiento del código sin tener downtime. 
- En este lab en particular, cuando el usuario visita la web y el frontend envía la request al backend a través de Express, el backend chequea el estado del archivo JSON con el valor de la feature flag, si es falso entonces la respuesta que Express le devuelve al frontend es "valor de feature flag: false" y frontend con este valor no muestra, pero si el valor del feature flag es true entonces frontend muestra el nuevo feature al usuario. 

Además usa dos workflows: 

- CI chequea que el repo se clone y que se puedan instalar las dependencias sin problemas. 
- E2E chequea si el server puede arrancar, si el end point "app/features" devuelve el JSON y si el frontend muestra o no el nuevo feature dependiendo del estado de la flag.