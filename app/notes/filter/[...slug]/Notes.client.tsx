// ==============v.2=================================================
"use client";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { page, search, perPage, tag }],
    queryFn: () => fetchNotes(page, search || undefined, perPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    // Використовуємо prefetch з сервера
    // при монтуванні компонента запит не буде виконуватись
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (newSearch: string) => {
    debouncedSearch(newSearch);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notes</div>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages || 0}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create note +
        </button>
      </header>

      {isLoading && <strong>Loading...</strong>}
      {isError && <strong>Error!!!</strong>}
      {data && data.notes.length > 0 && <NoteList items={data.notes} />}
      {data && data?.notes.length === 0 && <p>No notes found</p>}

      {/* console.log("CURRENT isModalOpen =", isModalOpen); */}
      {isModalOpen && (
        <>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <NoteForm
              onCancel={() => {
                setIsModalOpen(false);
              }}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

//==============v.1=================================================
// "use client";
// import { fetchNotes } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { FetchNotesResponse } from "@/lib/api";
// import NoteList from "@/components/NoteList/NoteList";

// interface NotesClientProps {
//   initialTag?: string
// }

// export default function NotesClient({initialTag}:NotesClientProps ) {
//   const { slug } = useParams<{ slug: string[] }>();
//   const tag = slug[0] === "all" ? undefined : slug[0] || initialTag;
// useParams для того щоб був доступним tag в компоненті
// console.log("client tag:", tag);

// const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
//   queryKey: ["notes", { tag, page: 1 }],
//   queryFn: () => fetchNotes(1, undefined, 12, tag),
//   refetchOnMount: false,
// Використовуємо prefetch з сервера
//при монтуванні компонента запит не буде виконуватись
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading notes</div>;

//   return (
//     <div className="styles.page">
//       <main>
//         <h1>Notes {tag ? `for "${tag}"` : "(All)"}</h1>
//         {data?.notes?.length ? (
//           <NoteList items={data.notes} />
//         ) : (
//           <p>No notes found</p>
//         )}
//       </main>
//     </div>
//   );
// }
//==========================================================================
// import { fetchNotes } from "@/lib/api";
// import NoteList from "@/components/NoteList/NoteList";
// import type { FetchNotesResponse } from "@/lib/api";

// interface NotesByCategoryProps {
//     params: Promise<{slug: string[]}>;
// };

// const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
//     const { slug } = await params;
//     console.log("slug: " + slug);
//     // const category = slug[0];
//     const category = slug[0] === 'all' ? undefined : slug[0];
//     const response: FetchNotesResponse = await fetchNotes( 1, undefined, 12, category);
//     return (
//         <div>
//             <h1>Notes { category ? `for "${category}"`: '(All)'}</h1>
//             {response?.notes?.length > 0 && <NoteList
//                 items={response.notes} />}
//         </div>
//     );
// };

// export default NotesByCategory;
