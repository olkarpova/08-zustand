'use client'

import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface NoteListProps {
  items: Note[];
}

export default function NoteList({ items }: NoteListProps) {
  const queryClient = useQueryClient();

  // Mutation для видалення нотатки==============
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error cdeleting note:", error);
      alert("Failed to create note. Please try again.");
    },
  });
  //=======================================================

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNoteMutation.mutate(id);
    }
  };

  return (
    <ul className={css.list}>
      {items.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <Link href={`/notes/${note.id}`}>View details</Link>
            
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
