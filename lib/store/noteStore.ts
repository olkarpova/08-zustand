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

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
}

export const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo'
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  // 2. Обгортаємо функцію створення стора
  persist(
    (set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({draft: note})),
  clearDraft: () => set(() => ({draft: initialDraft})),
    }),
    {
      // Ключ у localStorage
      name: "note-draft",
      // Зберігаємо лише властивість draft
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
