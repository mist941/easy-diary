import { create } from 'zustand';

const useCurrentSelectedDateStore = create<{
  date: Date | undefined;
  setDate: (date: Date) => void;
}>((set) => ({ date: new Date(), setDate: (date) => set({ date }) }));

export default useCurrentSelectedDateStore;
