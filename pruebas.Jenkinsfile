pipeline {
    agent any
    environment {       
        def REPO_NAME = "SIM-Front"   
        def name = "SIM-Frontend"
        def folder = "sim-front"
    }
    stages {
        stage ('Pull code') {
            steps{
                git credentialsId: 'DevOps', url: "https://sistemas-integrales.visualstudio.com/Minjusticia/_git/${env.REPO_NAME}"
            }
        }
        stage ('npm install') {
            steps{
                bat "npm install"
            }
        }
        stage('Angular build') {
            steps{
                bat "npm run ng-pruebas"
            }
        }
        stage('Clean Deploy iis') {
            steps{
                bat """RMDIR "C:\\inetpub\\wwwroot\\front\\${env.folder}" /S /Q"""
                bat """mkdir "C:\\inetpub\\wwwroot\\front\\${env.folder}" """
            }
        }
        
        stage('Deploy iis') {
            steps{
                bat """xcopy ".\\dist\\${env.NAME}" "C:\\inetpub\\wwwroot\\front\\${env.folder}" /h /i /c /k /e /r /y"""
                bat """xcopy "C:\\inetpub\\wwwroot\\front\\web.config" "C:\\inetpub\\wwwroot\\front\\${env.folder}" """
            }
        }

    }
}