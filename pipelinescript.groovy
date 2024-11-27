pipeline {
 agent any
 environment {
  REPO_URL =
'https://github.com/mkrimaro13/SoftwareEmpresarial-DivisionPoliticaAPI.git'
  BRANCH = 'jenkins' // Cambia esto si usas otra rama
  DOCKER_IMAGE = 'apidivisionpolitica:latest'
  DOCKER_CONTAINER = 'apidivisionpolitica'
 }
 stages {
  stage('Clonar Repositorio') {
   steps {
    git branch: "${BRANCH}", credentialsId: '100', url: "${REPO_URL}"
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
        docker ps -q --filter "name=%DOCKER_CONTAINER%" | findstr . && docker stop %DOCKER_CONTAINER% || echo No hay contenedor en ejecución
        docker ps -a -q --filter "name=%DOCKER_CONTAINER%" | findstr . && docker rm %DOCKER_CONTAINER% || echo No hay contenedor detenido
        '''
    }
   }
  }
  stage('Desplegar Contenedor Docker') {
   steps {
    script {
     bat 'docker container run --network reddivisionpolitica --name %DOCKER_CONTAINER% -p 8085:3030 -d %DOCKER_IMAGE%'
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
