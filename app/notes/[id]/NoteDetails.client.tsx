"use client"

import { useParams } from "next/navigation";
import css from "./NoteDetailsClient.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", {id}],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;
    
    const formatteddate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formatteddate}</p>
        {/* <img src={image[0]} alt={note.title} width={240} />
        //next свариться бо teg img в next не використовують */}
      </div>
    </div>
  );
};

export default NoteDetailsClient;
