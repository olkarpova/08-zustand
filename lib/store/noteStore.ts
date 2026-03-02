import { create } from 'zustand';
import { NewNoteData } from '../api';
// import { NoteTag } from '@/types/note';
// 1. Імпортуємо функцію
import { persist } from 'zustand/middleware';

// type NoteDraft = {
//   title: string;
//   content: string;
//   tag: NoteTag;
// };

interface NoteDraftStore {
  draft: NewNoteData;
  setDraft: (newNote: NewNoteData) => void;
  clearDraft: () => void;
}

export const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo'
};

// func()() - currying(карування) - викликається одна ф 
// вонa повертає іншу ф і оця інша ф відразу викликається
export const useNoteDraftStore = create<NoteDraftStore>()(
  // 2. Обгортаємо функцію створення стора
  // заперсистити, для того щоб дані з глоб сх зберігати в локальному
  // особл роботи з локал сх: коли ми зб в локал сх обєкт ми його stringify
  // i при stringify функції не збер а властивості обʼєкта так,
  //  а методи ні
  // під яким ключем ми будемо зберігати
  persist(
    (set) => ({
  draft: initialDraft,
  setDraft: (newNote) => set(() => ({draft: newNote})),
  clearDraft: () => set(() => ({draft: initialDraft})),
    }),
    {
      // Ключ у localStorage
      name: "note-draft",
      // що саме ми зберігаємо, Зберігаємо лише властивість draft
      // { } повертаєимо обʼєкт: ключ draft значення якого state.draft
      partialize: (state) => ({ draft: state.draft }),
      //секʼюрність
    },
  ),
);
