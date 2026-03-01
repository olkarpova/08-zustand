// import Link from "next/link";
import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found-NoteHub",
  description: "The requested page does not exist in NoteHub notes application.",
  // url: "https://your-notehub-app.vercel.app/",
  openGraph: {
    type: "website",
    url: "https://your-notehub-app.vercel.app",
    title: "Page not found-NoteHub",
    description: "The requested page does not exist in NoteHub notes application.n",
    // siteName: "My Website",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "note image"
     }]
  }
}

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      {/* <Link href="/">Go back home</Link> */}
    </div>
  );
};
export default NotFound;
// якщо хочемо логіку тут - routerback наприклад,
// дати можливість користувачу перейти кудись 
// використовуємо useclient дерективу 
// робимо компонент клієнтським