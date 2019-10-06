import { AsyncStorage } from "react-native";

class LocalStore {
   
    saveString(key, value) {
        try {
            AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('Error');
        }
    }

    receiveString(key) {
        var item = AsyncStorage.getItem(key);
        return item;
    }
    async saveItem(key, item) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.log('Error');
        }
    }

    async retrieveItem(key) {
        var item = await AsyncStorage.getItem(key);
        return JSON.parse(item);
    }

    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('Error ' + error.value);
        }
    }

    async clear() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log('Error ' + error.value);
        }
    }
}

export const localstor = new LocalStore();