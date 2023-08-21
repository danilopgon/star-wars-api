# Configura los archivos .env

```
El que se encuentra en la raiz funciona para el backend
El del front está en la carpeta front
```

Ambos tienen un .env.dist con las variables de entorno que necesitan ser configuradas

# Ejecuta el Front desde src/front/ con

```
npm install
npm run build

//Servidor de desarrollo con npm run dev
```

# Ejecuta el Back desde raiz

```
pipenv install;
pipenv run start
```

# Setup de la DB

Pipenv run start -> inicializa la base de datos
Sin embargo se puede usar desde la carpeta api:

```
pipenv run init
pipenv run migrate
pipenv run upgrade
```

El endpoint api/setup puede llamarse 3 veces para llenar cada uno de las tablas principales con los datos de Swapi
