"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: 'reports/cucumber-api', 
    reportPath: './reports',
    attachDisplayParameters: true,
    metadata:{
        browser: {
            name: 'API Test',
            version: 'N/A'
        },
        device: 'Backend',
        platform: {
            name: 'N/A'
        }
    },
    customData: {
        title: 'Resultados de Pruebas de API',
        data: [
            {label: 'Proyecto', value: 'API Doc. Digital'},
            {label: 'Fecha de Ejecución', value: new Date().toLocaleString()},
        ]
    }
});
