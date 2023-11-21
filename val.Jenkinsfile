pipeline {
    agent any
    environment {       
        def REPO_NAME = "SIM-Front"   
        def ACCOUNT_NAME = "valsim"
        def ACCOUNT_KEY = "RPje4g+Y2/07V8jc4jg0CR07ij67cRwlGXTtraZOZxES7cGr36YuH7Mue7zGbis5IhF1dVPUEOc+QfxeNoNvjQ=="
        def packageJSON = readJSON file: 'package.json'
        def version = "${packageJSON.version}"
        def name = "SIM-Frontend"
    }
    stages {
        stage ('Pull code') {
            steps{
                git credentialsId: 'AzureDevOpsCredentials', url: "https://sistemas-integrales.visualstudio.com/Minjusticia/_git/${env.REPO_NAME}"
            }
        }
        stage ('npm install') {
            steps{
                nodejs('NodeJs') {
                    sh "npm install"
                }
            }
        }
        stage('Angular build') {
            steps{
                nodejs('NodeJs') {
                    sh "npm run ng-val"
                }
            }
        }
        stage('Azure clean deploy') {
            steps{
                sh "az storage blob delete-batch --account-name ${env.ACCOUNT_NAME} -s '\$web' --account-key ${env.ACCOUNT_KEY}"
            }
        }
        stage('Azure deploy') {
            steps{
                sh "az storage blob upload-batch --account-name ${env.ACCOUNT_NAME} --source ./dist/${env.NAME} -d '\$web' --account-key ${env.ACCOUNT_KEY}"
            }
        }
    }
    post {
        success {
            script {
                office365ConnectorSend color: '#00b00f', message: "Despliegue exitoso ${env.NAME} ${env.VERSION}", status: 'Ok', webhookUrl: 'https://outlook.office.com/webhook/90108be5-f8ba-4221-a4e1-03db1840e26c@e2c3c8a1-9b30-48b8-b990-b621fda5e551/JenkinsCI/d92637755d4c4115bd58bbb8a11cab3d/8dedca02-8707-4ea6-89da-94cb54286e39'
            }
        }
        failure {
            script {
                office365ConnectorSend color: '#ff1100', message: "Error en despliegue ${env.NAME} ${env.VERSION}", status: 'Error', webhookUrl: 'https://outlook.office.com/webhook/90108be5-f8ba-4221-a4e1-03db1840e26c@e2c3c8a1-9b30-48b8-b990-b621fda5e551/JenkinsCI/d92637755d4c4115bd58bbb8a11cab3d/8dedca02-8707-4ea6-89da-94cb54286e39'
            }
        }
    }
}
