import * as Yup from "yup";

export const noteValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be at most 50 characters')
        .required('Title is required'),
    content: Yup.string()
        .max(500, 'Content must be at most 500 characters'),
    tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
        .required('Tag is required'),
});