import { store } from 'store/store';

export const useStore = () => {
  return store.getState();
};
