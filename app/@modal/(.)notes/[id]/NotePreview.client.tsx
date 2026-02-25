"use client"

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from "./NotePreview.module.css"
import type { Note } from '@/types/note';
import { useRouter } from 'next/navigation';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, error} = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <div className={css.loading}>Loading...</div>;
  if (error || !note) return <div className={css.error}>Note not found</div>;

  const formattedDate = note.updatedAt
    ? `Updated: ${note.updatedAt}`
    : `Created: ${note.createdAt}`;
  
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
        {/* <img src={image[0]} alt={note.title} width={240} />
        //next свариться бо teg img в next не використовують */}
      </div>
    </div>
    </Modal>
  );
};

export default NotePreviewClient;