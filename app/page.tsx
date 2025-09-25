import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDebounce } from "use-debounce";
import css from "./page.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import noteFetch, { NotesResponse } from "@/lib/noteService";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  const perPage = 16;

  const { data, isLoading, isError, isSuccess } = useQuery<NotesResponse>({
    queryKey: ["noteHubKey", page, search],
    queryFn: () => noteFetch(search, page, perPage),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
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
    <>
      <div className={css.app}>
        <ToastContainer
          theme="auto"
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
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={(val) => setSearch(val)} />
          {isSuccess && notes.length > 0 && data?.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages ?? 0}
              page={page}
              setPage={(newPage) => setPage(newPage)}
            />
          )}

          <button className={css.button} onClick={() => setIsOpenModal(true)}>
            Create note
          </button>
          {isOpenModal && (
            <Modal onClose={() => setIsOpenModal(false)}>
              <NoteForm onClose={() => setIsOpenModal(false)} />
            </Modal>
          )}
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {isSuccess && notes?.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
}

export default App;
