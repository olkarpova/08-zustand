import { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Notes List by: ${tag} Category`,
    description: `List of notes, which belong to ${tag}`,
    openGraph: {
      title: `Note: ${tag}`,
      description: `List of notes, which belong to ${tag}`,
      url: `https://08-zustand-8tplz6fwx-olena-karpova.vercel.app//notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "note image for category",
        },
      ],
      type: "article",
    },
  };
}

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  let tag: string | undefined;
  if (slug[0] === "all") {
    tag = undefined;
  } else {
    tag = slug[0];
  }
  // await new Promise(r => setTimeout(r, 3000))
  //імітація затримки
  //рендериться список з затримкою
  //тому треба loader

  const queryClient = new QueryClient();

  // prefetch doesn't return any data, it saves it into the cash;
  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag, page: 1 }], //{}- обʼєкт буде ключем категорії
    queryFn: () => fetchNotes(1, undefined, 12, tag),
  });
  return (
    <div>
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient tag={tag} />
          {/*  client component NoteClient can use a cash */}
        </HydrationBoundary>
      </main>
    </div>
  );
}
