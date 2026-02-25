import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesPageProps {
    params: Promise<{slug: string[]}>
}

export default async function NotesPage({ params }: NotesPageProps) {
    const { slug } = await params

    let tag: string | undefined;
    if (slug[0] === 'all') {
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
        queryKey: ['notes', { tag, page: 1 }], //{}- обʼєкт буде ключем категорії
        queryFn: () => fetchNotes( 1, undefined, 12, tag )
    })
    return (
        <div>
            <main>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <NotesClient tag={ tag } />
                    {/*  client component NoteClient can use a cash */}
                </HydrationBoundary>
            </main>
        </div>     
    )
}

