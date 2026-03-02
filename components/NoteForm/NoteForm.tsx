"use client"

import css from "./NoteForm.module.css"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, NewNoteData } from "@/lib/api";
import { NoteTag } from "../../types/note";
//useRouter from next/navigation!!!
import { useRouter } from "next/navigation";
// 1. Імпортуємо хук
import { useNoteDraftStore } from "@/lib/store/noteStore";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
    const router = useRouter();
    // 2. Викликаємо хук і отримуємо значення
    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    // const state = useNoteDraftStore();
    // console.log(state);

    // 1:22
    // const draft = useNoteDraftStore((state) => {state.draft}); - ф селектор
    // const changeDraft = usenoteDraftStore((state) => {state.setdraft})
    //це функції селектори, виносимо їх в окремі змінні в store, бо 
    // структура story може змінюватись

    // 3. Оголошуємо функцію для onChange щоб при зміні будь-якого 
	// елемента форми оновити чернетку нотатки в сторі
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
        setDraft({
            ...draft,
            [event.target.name]: event.target.value as NoteTag,
        });
    };

    const queryClient = useQueryClient();

    const createNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: async () => {
            // 5. При успішному створенні нотатки очищуємо чернетку
            clearDraft();
            // invalidete не потрібен
            // queryClient.invalidateQueries({
            //     queryKey: ['notes'],
            // });
            //без цього не оновлювався список нотаток:
            await queryClient.invalidateQueries({ queryKey: ['notes'] });
            await queryClient.refetchQueries({ queryKey: ['notes'] });
            router.push('/notes/filter/all');
        },
        onError: (error) => {
            console.error("Error creating note:", error);
            alert("Failed to create note. Please try again.");
        },
    });
    
    // const handleSubmit = (formData: FormData) => {
    //     const values = Object.fromEntries(formData) as NewNoteData;
    //     createNoteMutation.mutate(values);
    // }; 
//formData не потрібна бо дані не збираємо з форми, 
// дані вже збережені в глобальному store
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        createNoteMutation.mutate(draft);
    }

    const onCancel = () => {
        router.push('/notes/filter/all');
    };
    // 6. До кожного елемента додаємо defaultValue та onChange
	// щоб задати початкове значення із чернетки 
	// та при зміні оновити чернетку в сторі
    return (
        // <form action={handleSubmit} className={css.form}>
        <form onSubmit={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title
                    <input
                        // value={draft.title}
                        //контролюємо input
                    type="text"
                    name="title"
// Щоразу при переході на маршрут /notes/action/create перевіряйте, 
// чи існує draft в Zustand. Якщо draft є — завантажуйте саме його в 
// початкові значення форми, якщо немає — то в початкові значення форми 
// підставляйте об’єкт initialDraft.
                        defaultValue={draft?.title}
                        onChange={handleChange}
                    className={css.input}
                    required
                    minLength={3}
                    maxLength={50}
                    disabled={createNoteMutation.isPending}
                />
                </label> 
                
            </div>
            <div className={css.formGroup}>
                <label htmlFor="content">Content
                 <textarea
                    name="content"
                        defaultValue={draft?.content}
                        onChange={handleChange}
                    rows={8}
                    className={css.textarea}
                    maxLength={500}
                    required
                    disabled={createNoteMutation.isPending}
                />
                </label> 
            </div>
            
            <div className={css.formGroup}>
                <label htmlFor="tag">Tag
                    <select id='tag' name="tag"
                        defaultValue={draft?.tag}
                        onChange={handleChange}
                        className={css.select} required>
                        {TAGS.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={onCancel}
                    disabled={createNoteMutation.isPending}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                        className={css.submitButton}
                        disabled={createNoteMutation.isPending}
                    >
                    { createNoteMutation.isPending ? "Creating..." : 'Create note'}
                </button>
            </div>
        </form>
    );
}

//========NoteForm without Formic: 
//Внесіть зміни у компонент components/NoteForm/NoteForm.tsx, 
// він має створювати таку ж розмітку, як і раніше, 
// але для цього вам потрібно використовувати не Formik, 
// а стандартні HTML-форми з formAction, щоб надалі зручно 
// інтегрувати збереження чернетки через Zustand не створюючи зайву і 
// складну логіку.

// 'use client';

// import { useRouter } from 'next/navigation';  
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createNote, type NewNoteData } from '@/lib/api';
// import css from './NoteForm.module.css';
// import type { NoteTag } from '../../types/note';  // Ваш тип

// const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];  // Статично

// export default function NoteForm() {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const createNoteMutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//       router.push('/notes/filter/all');  // Редірект замість onCancel
//     },
//     onError: (error) => {
//       console.error('Error creating note:', error);
//       alert('Failed to create note. Please try again.');
//     },
//   });

//   const handleSubmit = (formData: FormData) => {
//     const values = Object.fromEntries(formData) as NewNoteData;
//     createNoteMutation.mutate(values);
//   };

//   const handleCancel = () => {
//     router.push('/notes/filter/all');
//   };

//   return (
//     <form action={handleSubmit} className={css.form}>
//       <div className={css.formGroup}>
//         <label htmlFor="title">Title</label>
//         <input
//           id="title"
//           type="text"
//           name="title"
//           className={css.input}
//           required
//           minLength={3}
//           maxLength={50}
//           disabled={createNoteMutation.isPending}
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="content">Content</label>
//         <textarea
//           id="content"
//           name="content"
//           rows={8}
//           className={css.textarea}
//           maxLength={500}
//           required
//           disabled={createNoteMutation.isPending}
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="tag">Tag</label>
//         <select id="tag" name="categoryId" className={css.select} required>
//           {TAGS.map((tag) => (
//             <option key={tag} value={tag}>
//               {tag}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={css.actions}>
//         <button
//           type="button"
//           className={css.cancelButton}
//           onClick={handleCancel}
//           disabled={createNoteMutation.isPending}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className={css.submitButton}
//           disabled={createNoteMutation.isPending}
//         >
//           {createNoteMutation.isPending ? 'Creating...' : 'Create note'}
//         </button>
//       </div>
//     </form>
//   );
// }
