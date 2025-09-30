//lib>api.ts

import axios from "axios";
import type { Note, NotePost } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
console.log(API_TOKEN);
const buildFetchConfig = (params?: Record<string, string | number>) => ({
  params,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

async function noteFetch(
  search: string,
  page: number,
  perPage = 16
): Promise<NotesResponse> {
  const params: Record<string, string | number> = { page, perPage, search };
  if (search.trim()) {
    params.search = search.trim();
  }

  const response = await axios.get<NotesResponse>(BASE_URL, {
    params: { page, perPage: 16, search },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  console.log(response.data);
  return response.data;
}
export default noteFetch;

export async function noteFetchID(id: string): Promise<Note> {
  const responseID = await axios.get<Note>(
    `${BASE_URL}/${id}`,
    buildFetchConfig()
  );
  return responseID.data;
}

export async function createNote(notePost: NotePost): Promise<Note> {
  const postNewItem = await axios.post<Note>(
    BASE_URL,
    notePost,
    buildFetchConfig()
  );
  return postNewItem.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteNoteItem = await axios.delete<Note>(
    `${BASE_URL}/${id}`,
    buildFetchConfig()
  );
  return deleteNoteItem.data;
}
