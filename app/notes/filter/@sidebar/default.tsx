import Link from "next/link"
import css from "./SidebarNotes.module.css"

const Category = [
    { id: 'all', label: "All notes" },
    { id: 'Todo', label: "Todo" },
    { id: 'Work', label: "Work" },
    { id: 'Personal', label: "Personal" },
    { id: 'Meeting', label: "Meeting" },
    { id: 'Shopping', label: "Shopping" },
];

export default function SidebarNotes() {
    return (
        <nav>
            <h3 className={css.title}>Filter by category</h3>
            <ul className={css.menuList}>
                {/* список тегів */}
                {Category.map(({ id, label }) => (
                    <li key={id} className={css.menuItem}>
                        <Link
                            href={`/notes/filter/${id}`}
                            className={css.menuLink}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
