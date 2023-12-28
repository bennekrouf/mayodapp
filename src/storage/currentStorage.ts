import { loadFromAsyncStorage, loadFromFirebase } from 'mayo-firestore-write';
import { Logger } from 'mayo-logger';

export const currentStorage = async () => {
    try {
        let current = await loadFromAsyncStorage();
        
        if(!current) {
            Logger.info('currentStorage: No data in AsyncStorage, loading from Firebase.');
            current = await loadFromFirebase();
        }

        return current?.answerStats || [];       
    } catch (error) {
        Logger.error('currentStorage Error:', error);
        throw error;        
    }
};
