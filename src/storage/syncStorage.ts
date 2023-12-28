import AsyncStorage from '@react-native-async-storage/async-storage';
import { writeToAsyncStorage, syncAsyncStorageToFirestore } from 'mayo-firestore-write';
import { Logger } from 'mayo-logger';
import Config from 'react-native-config';

const LAST_SYNC_DATE_KEY = 'LAST_SYNC_DATE';
const FORCE_SYNC = Config.FORCE_SYNC === 'true';

export const syncStorage = async (answerStats) => {
    try {
        Logger.info(`Attempting to write to AsyncStorage with data: ${JSON.stringify(answerStats)}`);
        await writeToAsyncStorage({answerStats});

        const lastSyncDate = await AsyncStorage.getItem(LAST_SYNC_DATE_KEY);
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the format 'YYYY-MM-DD'

        if (lastSyncDate !== currentDate || FORCE_SYNC) {
            Logger.info("Synchronizing AsyncStorage data to Firestore...");
            await syncAsyncStorageToFirestore();
            
            // Update the last sync date in AsyncStorage
            await AsyncStorage.setItem(LAST_SYNC_DATE_KEY, currentDate);
        } else {
            Logger.info("Skipping Firestore synchronization since it already happened today.");
        }
    } catch (error) {
        Logger.error("Error in syncStorage function:", error);
        throw error;
    }
};
