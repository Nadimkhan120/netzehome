import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import type { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';
const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

type User = any;

interface UserState {
  user: User;
  setUserData: (data: any) => void;
  removeUserData: () => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      setUserData: (data: any) => {
        set({
          user: data,
        });
      },
      removeUserData: () => {
        set({
          user: null,
        });
      },
    }),
    {
      name: 'user-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage), // (optional) by default the 'localStorage' is used
    }
  )
);

// set user data
export const setUserData = (data: any) => {
  return useUser.getState().setUserData(data);
};
