import { create } from 'zustand';

// Modify GQLStore to accept generic T
type GQLStore<T> = {
  data: Record<string, T>;
  setData: (key: string, value: T) => void;
  getData: (key: string) => T | undefined;
};

// The dynamic store function, accepting generics
export const useGQLStore = <T>() =>
  create<GQLStore<T>>((set, get) => ({
    data: {},
    setData: (key, value) =>
      set((state) => ({ data: { ...state.data, [key]: value } })),
    getData: (key) => get().data[key]
  }));
