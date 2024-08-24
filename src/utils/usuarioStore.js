import create from "zustand";

export const useBoundStore = create(() => ({
    count: 0,
    text: 'hello',
  }))
  
export const inc = () =>
    useBoundStore.setState((state) => ({ count: state.count + 1 }))
  
export const setText = (text) => useBoundStore.setState({ text })