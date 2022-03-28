# SOLP - Frontend

## Tecnologías utilizadas

* AngularJs 1.6.5
* >= Node 8

## Pasos en la instalación

* ``git clone {repo-solp-front}``
* ``npm install`` (dentro de la carpeta del proyecto)
* ``node_modules/bower/bin/bower install`` (dentro de la carpeta del proyecto)
* configurar el proyecto en el archivo **js/app.config.js**
````javascript
$rootScope.url = 'http://solp-admin.diper-it.com/api'; //link a la API
$rootScope.url_uploads = 'http://solp-admin.diper-it.com/api/uploads'; //link a la carpeta donde se encuentran los archivos subidos por el admin
````

* modificar la línea 5 de **index.html**:
````
		<base href=""/>
````
	con el path donde se encuentre el root de la aplicación frontend
