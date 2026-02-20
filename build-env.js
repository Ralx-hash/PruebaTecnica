const fs = require('fs');
const path = require('path');

// Lee las variables de entorno del proveedor
const apiUrl = process.env.API_URL || 'https://pruebatecnica-litestar.onrender.com';
const production = process.env.NODE_ENV === 'production' || process.env.PRODUCTION === 'true';

// Genera el contenido del archivo environment.ts
const envContent = `export const environment = {
    production: ${production},
    apiUrl: '${apiUrl}'
};
`;

// Ruta al archivo environment.ts
const envPath = path.join(__dirname, 'src', 'environments', 'environment.ts');

try {
    // Sobrescribe el archivo environment.ts con las variables de entorno
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Environment configurado correctamente:');
    console.log(`   - Production: ${production}`);
    console.log(`   - API URL: ${apiUrl}`);
} catch (error) {
    console.error('❌ Error al generar environment.ts:', error);
    process.exit(1);
}