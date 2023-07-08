import { get, writable } from "svelte/store";

const str = (val: any) => JSON.stringify(val, null, 2);
const obj = JSON.parse;

export type LocalStore<T> = {
  subscribe: (subscription: (value: T) => void) => () => void;
  set: (value: T) => void;
  update: (callback: (currentValue: T) => T) => void;
};

const localStore = <T>(key: string, initialData: T): LocalStore<T> => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, str(initialData));
  }

  const saved = obj(localStorage.getItem(key) || "{}");

  const store = writable(saved);
  const { subscribe, set, update } = store;

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, str(value));
      return set(value);
    },
    update: (callback) => {
      const updatedStore = callback(get(store));

      localStorage.setItem(key, str(updatedStore));
      return set(updatedStore);
    },
  };
};

export default localStore;
