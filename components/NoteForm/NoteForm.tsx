import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import css from "./NoteForm.module.css"
import { noteValidationSchema } from "./validationSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NoteTag } from "../../types/note";

export interface NoteFormValues {
    title: string,
    content: string,
    tag: NoteTag,
}

interface NoteFormProps {
    onCancel: () => void;
    // onSubmit: (values: NoteFormValues) => void;
}


const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
}


export default function NoteForm({ onCancel }: NoteFormProps) {

    const queryClient = useQueryClient();

    const createNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onCancel();
        },
        onError: (error) => {
            console.error("Error creating note:", error);
            alert("Failed to create note. Please try again.");
        },
    });
    
    const handleSubmit = (
        values: NoteFormValues,
        actions: FormikHelpers<NoteFormValues>
    ) => {
        // onSubmit(values);

        // actions.resetForm();
        // actions.setSubmitting(false);
        createNoteMutation.mutate(values, {

            onSettled: () => {
                actions.resetForm();
                actions.setSubmitting(false);
            },
        });
    }; 

    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={noteValidationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting, isValid, dirty }) => (
               <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field
                            id="title"
                            type="text"
                            name="title"
                            className={css.input}
                        />
                        <ErrorMessage name="title" component='span' className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <Field
                            as='textarea'
                            id="content"
                            name="content"
                            rows={8}
                            className={css.textarea}
                        />
                        <ErrorMessage name="content" component="span" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field as="select" id="tag" name="tag" className={css.select}>
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <ErrorMessage name="tag" component="span" className={css.error} />
                    </div>
            
                <div className={css.actions}>
                    <button
                        type="button"
                        className={css.cancelButton}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                            className={css.submitButton}
                        disabled={isSubmitting || !isValid || !dirty}
                    >
                        Create note
                    </button>
                </div>
            </Form> 
            )}
        </Formik>
    );
}