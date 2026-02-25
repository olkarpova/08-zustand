import React from "react";
import { Suspense } from "react";


type NotesLayoutProps = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: NotesLayoutProps) => {
    return (
        <section style={{
            display: "flex",
            gap: 20,
            backgroundColor: "grey"
            }}
        >
            <Suspense fallback={<div>Loading categories...</div>}>{sidebar}</Suspense>
            <div>{children}</div>
        </section>
    );
}

export default NotesLayout;
// в React є Suspense в який як пропс ми передамо 
// fallback де буде Loader 