pipeline {
    agent any
   environment {
    NODEJS_HOME = '/usr/local/bin' // Example for Linux
    PATH = "${NODEJS_HOME}:${env.PATH}"
}
    stages {
        stage('Backend - Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Backend - Test') {
            steps {
                dir('backend') {
                    sh 'npm test' // Ensure you have test scripts defined in your backend package.json
                }
            }
        }
        stage('Frontend - Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build' // Ensure you have a build script defined in your frontend package.json
                }
            }
        }
        stage('Deploy') {
            steps {
             echo"deployed"
            }
        }
    }
}
