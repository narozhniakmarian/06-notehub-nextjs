//app>notes>Notes.client.tsx

"use client";

import noteFetch from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/app/loading";
import ErrorMessage from "@/app/notes/error";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  const handleChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["noteHubKey", search, page],
    queryFn: () => noteFetch(search, page),
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes ?? [];

  useEffect(() => {
    if (
      isSuccess &&
      (data?.notes?.length ?? 0) === 0 &&
      debouncedSearch.trim()
    ) {
      toast.error("No notes found for your request.");
    }
  }, [data?.notes, isSuccess, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);
  return (
    <section className={css.app}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={(value) => handleChange(value)} />
        {isSuccess && notes.length > 0 && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages ?? 0}
            page={page}
            setPage={(newPage) => setPage(newPage)}
          />
        )}

        <button className={css.button} onClick={() => setIsOpenModal(true)}>
          {" "}
          Create note
        </button>

        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <NoteForm onClose={() => setIsOpenModal(false)} />
          </Modal>
        )}
      </div>

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}
    </section>
  );
}
