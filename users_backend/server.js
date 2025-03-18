require("dotenv").config();
var express = require("express");
var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');
const axios = require("axios");
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

var app = express();

const TENANT_ID = process.env.TENANT_ID;
const GRAPH_CLIENT_ID = process.env.GRAPH_CLIENT_ID;
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET;
const GRAPH_API_URL = "https://graph.microsoft.com/v1.0/users";
const CLIENT_ID = '84be9094-1f64-4ee5-8921-46319e812daf';

const client = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        if (err) {
            return callback(err);
        }
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

function checkToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    const bearerToken = token.split(' ')[1];

    const validationOptions = {
        audience: CLIENT_ID, // Validar que el token sea para este cliente
        issuer: `https://sts.windows.net/${TENANT_ID}/`, // Validar el emisor del token
    };

    jwt.verify(bearerToken, getKey, validationOptions, (err, decoded) => {
        if (err) {
            console.error("Token validation error:", err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

// Configuración de vistas

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Prueba API',
            version: '1.0.0',
            description: 'Documentación de la API de Node Prueba'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ],
        components: {
            securitySchemes: {
                openId: {
                    type: 'openIdConnect',
                    openIdConnectUrl: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration`,
                    scopes: {
                        "https://graph.microsoft.com/.default": "Access Microsoft Graph"
                    }
                }
            }
        },
        security: [
            {
                openId: []
            }
        ]
    },
    apis: ['./server.js']
};

var swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users/buscar/{termino}:
 *   get:
 *     summary: Busca usuarios en Microsoft Graph
 *     parameters:
 *       - in: path
 *         name: termino
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda para usuarios
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 value:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       displayName:
 *                         type: string
 *                       mail:
 *                         type: string
 *       401:
 *         description: Token is required
 *       403:
 *         description: Invalid token
 *       500:
 *         description: Error al consultar Microsoft Graph
 */
app.get("/users/buscar/:termino", checkToken, async (req, res) => {
    try {
        const termino = req.params.termino;
        const token = await obtenerToken();

        const response = await axios.get(`${GRAPH_API_URL}?$filter=startswith(displayName,'${termino}') or startswith(mail,'${termino}')`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error en la búsqueda:", error.response?.data || error.message);
        res.status(500).json({ error: "Error al consultar Microsoft Graph" });
    }
});

// Función para obtener el token de aplicación
async function obtenerToken() {
    const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", GRAPH_CLIENT_ID);
    params.append("client_secret", GRAPH_CLIENT_SECRET);
    params.append("scope", "https://graph.microsoft.com/.default");

    const response = await axios.post(url, params, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
    return response.data.access_token;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
