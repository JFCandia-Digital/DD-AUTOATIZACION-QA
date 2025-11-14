// Función optimizada para generar y publicar el reporte
def publishCucumberReport() {
    echo "Generando reporte HTML consolidado..."
    sh 'npm run api-report || true'

    echo "Publicando reporte HTML..."
    def reportPath = 'reports/index.html'
    if (fileExists(reportPath)) {
        publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports',
            reportFiles: 'index.html',
            reportName: 'Reporte de Pruebas API'
        ])
    } else {
        echo "ADVERTENCIA: No se encontró el archivo del reporte en '${reportPath}'."
    }
}

pipeline {
    agent { label 'playwright' }

    parameters {
        // --- Checkboxes para Tags de Pruebas ---
        booleanParam(name: 'TAG_AUTHENTICATION', defaultValue: true, description: 'Ejecutar tests de API Authentications (@Auth)')
        booleanParam(name: 'TAG_COMUNICACION', defaultValue: false, description: 'Ejecutar tests de API Comunicaciones (@Comunicaciones)')
        booleanParam(name: 'TAG_DESPACHAR', defaultValue: false, description: 'Ejecutar tests de API Despachar (@Despachar)')
        booleanParam(name: 'TAG_ENTIDADES', defaultValue: false, description: 'Ejecutar tests de API Entidades (@Entidades)')
        booleanParam(name: 'TAG_TIPOS', defaultValue: false, description: 'Ejecutar tests de API Entidades (@Tipos)')
        booleanParam(name: 'TAG_REGRESSION', defaultValue: false, description: 'Ejecutar todos los tests de Regresión (@API)')
    }

    stages {
        stage('Preparación') {
            steps {
                withCredentials([string(credentialsId: 'env-doc-digital', variable: 'DOTENV_CONTENT')]) {
                    echo "Creando y formateando archivo .env..."
                    sh 'echo "$DOTENV_CONTENT" | tr " " "\n" > .env.api'
                }
                echo "Instalando dependencias..."
                sh 'npm install'
                
                echo "Eliminando carpeta de reportes antiguos."
                sh 'rm -rf reports'
            }
        }

        stage('Ejecutar Pruebas') {
            steps {
                script {

                    // --- 2. Lógica para procesar tags seleccionados ---
                    def selectedTags = []
                    if (params.TAG_AUTHENTICATION) { selectedTags.add('@Auth') }
                    if (params.TAG_COMUNICACION) { selectedTags.add('@Comunicaciones') }
                    if (params.TAG_DESPACHAR) { selectedTags.add('@Despachar') }
                    if (params.TAG_ENTIDADES) { selectedTags.add('@Entidades') }
                    if (params.TAG_TIPOS) { selectedTags.add('@Tipos') }
                    if (params.TAG_REGRESSION) { selectedTags.add('@API') }
                    
                    def tagsArgument = ''
                    if (!selectedTags.isEmpty()) {
                        def tagExpression = selectedTags.join(' or ')
                        tagsArgument = "--tags '${tagExpression}'"
                    }
                    echo "Argumento de tags: ${tagsArgument ?: 'ninguno (todos los escenarios)'}"
                    
                    // --- 3. Ejecutar pruebas con manejo de errores ---
                    try {
                        echo "Ejecutando tests con el tag: ${tagsArgument}"

                        sh "npx cucumber-js --profile api ${tagsArgument}"
                        
                    } catch (e) {
                        echo "Error durante la ejecución de pruebas: ${e.message}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Generando y publicando reportes..."
                publishCucumberReport()

                archiveArtifacts artifacts: 'reports/json-acuse-recibo/*.json', allowEmptyArchive: true
                
                echo "Limpiando el workspace..."
                cleanWs()
            }
        }
    }
}