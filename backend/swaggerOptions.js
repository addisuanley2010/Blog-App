import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'My Blog Application',
            version: '1.0.0',
            description: 'API Documentation for Blog App',
            contact: {
                name: 'Addisu Anley',
                email: 'addisuanley2010@gmail.com',
                url: 'https://addisu.netlify.app/',
            }
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',  
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['routes/*.js'], // Ensure this path is correct
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);