# Front

Para ejecutar el contenedor, ejecutar estos pasos:

- cd cd .\frontcloud-app\
- docker build -t frontcloud-app .
- docker run -d -p 8080:80 --name frontcloud-app frontcloud-app
- ir a http://localhost:8080

VITE_BACKEND_URL=http://34.57.190.157:8000 docker-compose up --build -d
