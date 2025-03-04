# Front

Para ejecutar el contenedor, ejecutar estos pasos:
- cd cd .\frontcloud-app\
- docker build -t frontcloud-app .
- docker run -d -p 8080:80 --name frontcloud-app frontcloud-app
- ir a http://localhost:8080