import NoteForm from "@/components/NoteForm/NoteForm";
import css from './page.module.css'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'CreateNote - NoteHub',
  description: "Create a new note in NoteHub. Add title, content, and tag to organize your ideas.",
  openGraph: {
    type: "website",
    url: "https://notehub.com", //link na vercel
    title: "CreateNote - NoteHub",
    description: "Create a new note with title, content, and category tag.",
    //для презентабельності
    siteName: "CreateNote", //can change it depends what do we want to include here
    images: [{
      url: "'/notehub-og-meta.jpg'",
      width: 600,
      height: 300,
      alt: "note image"
     }]
}
}

export 
const CreateNote = () => {
  return (
  <main className={css.main}>
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm/>
    </div>
  </main>
  );
};

export default CreateNote;