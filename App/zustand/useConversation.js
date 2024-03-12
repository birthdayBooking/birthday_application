import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  lastestMesssage: null,
  setLastestMessage: (lastestMesssage) => set({ lastestMesssage }),
}));

export default useConversation;
