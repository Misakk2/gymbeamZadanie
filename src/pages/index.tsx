import { Open_Sans } from "next/font/google";
import DarkModeToggle from "./components/DarkModeToggle";
import TodoList from "./components/Todos/TodoList";
import Toasts from "./components/Toast/Toasts";


const openSans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <main className={`flex min-h-screen flex-col items-center ${openSans.className}`}>
        <header className="flex w-full p-9"><DarkModeToggle /></header>
        <TodoList />
        <Toasts />
      </main>
    </div>
  );
}