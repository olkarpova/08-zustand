import axios from "axios";
import  type { Note, NoteTag }  from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search?: string,
  perPage: number = 12,
  categoryIdOrTag?: string | NoteTag
): Promise<FetchNotesResponse> => {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string | NoteTag;
  } = { page, perPage, ...(search?.trim() && { search: search.trim() }) };
  
  if (categoryIdOrTag && categoryIdOrTag !== 'all') {
    params.tag = categoryIdOrTag;
  }
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
      {
        params,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
    },
  );
  console.log(response.data)
  return response.data;
  };

// =====Функція для створення нотатки

export const createNote = async (
  noteData: Pick<Note, 'title' | 'content' | 'tag'>
): Promise<Note> => {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};
// ============// Функція для видалення нотатки

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};
// ==функція для отримання деталей однієї нотатки за її id.=======
export const fetchNoteById = async (id: Note['id']) => {
  const {data} = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      params: {},
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
    );

    return data

}