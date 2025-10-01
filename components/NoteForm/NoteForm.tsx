import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { toast } from "react-toastify";
import { NotePost } from "@/types/note";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onClose: () => void;
}

const InitialValues: NotePost = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newNote: NotePost) => await createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteHubKey"] });
      onClose?.();
      toast.success("Your note added successfully");
    },
  });

  const handleSubmit = (values: NotePost) => {
    mutation.mutate(values);
  };

  const CreateNoteFormSchema = Yup.object().shape({
    title: Yup.string().min(3).max(50).required(),
    content: Yup.string().max(500),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required(),
  });

  return (
    <Formik
      initialValues={InitialValues}
      validationSchema={CreateNoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label className={css.lable} htmlFor="title">
            Title
          </label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label className={css.lable} htmlFor="content">
            Content
          </label>
          <Field
            id="content"
            name="content"
            as="textarea"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label className={css.lable} htmlFor="tag">
            Tag
          </label>
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
          <button className={css.cancelButton} type="button" onClick={onClose}>
            Cancel
          </button>
          <button className={css.submitButton} type="submit">
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
