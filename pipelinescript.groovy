pipeline {
 agent any
 environment {
  REPO_URL =
'https://github.com/frayosorio/apiDivisionPoliticaExpressJS.git'
  BRANCH = 'main' // Cambia esto si usas otra rama
  DOCKER_IMAGE = 'apidivisionpolitica:latest'
 }
 stages {
  stage('Clonar Repositorio') {
   steps {
    git branch: "${BRANCH}", credentialsId: '100', url:
"${REPO_URL}"
   }
  }
  stage('Construir Imagen Docker') {
   steps {
    script {
     bat 'docker build -t %DOCKER_IMAGE% .'
    }
   }
  }
  stage('Detener Contenedor Anterior') {
   steps {
    script {
     bat '''
docker ps -q --filter
"name=dockerapidivisionpolitica" | findstr . && docker stop
dockerapidivisionpolitica || echo No hay contenedor en ejecución
 docker ps -a -q --filter
"name=dockerapidivisionpolitica" | findstr . && docker rm
dockerapidivisionpolitica || echo No hay contenedor detenido
 '''
    }
   }
  }
  stage('Desplegar Contenedor Docker') {
   steps {
    script {
     bat 'docker container run --network reddivisionpolitica --name dockerapidivisionpolitica -p 8080:3030 -d %DOCKER_IMAGE%'
    }
   }
  }
 }
 post {
  success {
   echo 'Despliegue exitoso.'
  }
  failure {
   echo 'Despliegue fallido.'
  }
 }
}
