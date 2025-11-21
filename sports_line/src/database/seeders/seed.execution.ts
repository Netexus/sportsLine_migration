import { AppDataSource } from '../../data-source';

import { runSeeders } from './main.seeder'; // <- Importamos 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

async function executeSeeds() {
    try {
        await AppDataSource.initialize();
        console.log('📡 Connection to the database established.');
        
        await runSeeders(AppDataSource);
    } catch (error) {
        console.error('❌ Error executing seeds:', error);
    } finally {
        await AppDataSource.destroy();
        console.log('🔌 Closed connection.');
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

executeSeeds();
