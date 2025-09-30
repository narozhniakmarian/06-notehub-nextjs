//app>notes>page.tsx

import noteFetch from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

async function Notes() {
  const queryClient = new QueryClient();

  const search = "";
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ["noteHubKey", search, page],
    queryFn: () => noteFetch(search, page),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default Notes;
