import 'dotenv/config'; // <- Importamos las variables del .env automáticamente. /
import { AppDataSource } from '../dbconfig/connection';

import { runSeeders } from './seed'; // <- Importamos 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

async function executeSeeds() {
    try {
        await AppDataSource.initialize();
        console.log('📡 Conexión con la base de datos establecida');
        await runSeeders(AppDataSource);
    } catch (error) {
        console.error('❌ Error ejecutando semillas:', error);
    } finally {
        await AppDataSource.destroy();
        console.log('🔌 Conexión cerrada');
    }
}

executeSeeds();
