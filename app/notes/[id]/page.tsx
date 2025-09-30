//app>notes>[id]>page.tsx

import { noteFetchID } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

type IdProps = {
  params: { id: string };
};

async function NoteDetailis({ params }: IdProps) {
  const queryClient = new QueryClient();
  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ["noteId", id],
    queryFn: () => noteFetchID(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetailis;
