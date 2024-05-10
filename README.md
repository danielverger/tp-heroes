# Prueba técnica

El proyecto se ha ceado con la versión LTS de Angular  (16.2.14.)
- Angular Material versión 16.2.14
- Bootstrap versión 4.6.2

## Servidor de desarrollo

Ejecutar `npm install` y luego `ng serve`

## Build

Ejecutar `npm run build-prod` para realizar el build de la aplicación

## Notas

Para simular las llamadas al backend, se ha creado un [http interceptor](src/app/interceptor-http.service.ts) que simular el backend 
