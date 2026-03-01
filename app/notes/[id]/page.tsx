import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from "@/lib/api";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { Metadata } from 'next';

interface generateMetadataProps {
    params: Promise<{id: string}>
}
export async function generateMetadata({ params }: generateMetadataProps):
    Promise<Metadata> {
    const { id } = await params
    const note = await fetchNoteById(id)
    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 30),
            url: `https://08-zustand-8tplz6fwx-olena-karpova.vercel.app/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: note.title,
                },
            ],
            type: "article",
        },
    }
}

interface NoteDetailsProps {
    params: Promise<{ id: string }>;
    //===important!!! id = name of folder [id]====
};

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    //===== we need to do await for object=====
    const { id } = await params;

    const note = await fetchNoteById(id);
    console.log(note);
    

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
    // <NoteDetailsClient note={note}/>
};

export default NoteDetails;