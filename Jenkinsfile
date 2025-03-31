pipeline {
    agent any
    environment {
        NODEJS_HOME = 'C:\\Program Files\\nodejs' // Example for Windows
        PATH = "${NODEJS_HOME};${env.PATH}"
    }
    stages {
        stage('Backend - Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Backend - Test') {
            steps {
                dir('backend') {
                    bat 'npm test' // Ensure you have test scripts defined in your backend package.json
                }
            }
        }
        stage('Frontend - Install Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }
        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build' // Ensure you have a build script defined in your frontend package.json
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deployed successfully'
            }
        }
    }
}
