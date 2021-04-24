import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<any | null> {
  // console.tron.log("LOAD METHOD RETURN IN STORAGE. LOADING KEY ===", key)
  try {
    const almostThere = await AsyncStorage.getItem(key);

    return almostThere ? JSON.parse(almostThere) : null;
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  console.log('BURNING DOWN THE HOUSE AND CLEARING STORAGE');
  try {
    await AsyncStorage.clear();
  } catch {}
}

export async function logoutOnDevice() {
  console.log('LOG OUT OF DEVICE WAS TRIGGERED');
  clear();
}

export async function getToken() {
  return await AsyncStorage.getItem('JWT').then((res) => {
    console.log('Getting JWT from storage', res);
    return res;
  });
}

export async function getRefreshToken() {
  return await AsyncStorage.getItem('REFRESH_JWT').then((res) => {
    // console.tron.log("Getting REFRESH TOKEN from storage", res);
    return res;
  });
}
