import 'dotenv/config';
import { AppDataSource } from './connection';

async function testConnection() {
    try {
        await AppDataSource.initialize();
        console.log('✅ Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('❌ Error de conexión:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

testConnection();
