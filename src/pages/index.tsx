import { Open_Sans } from "next/font/google";
import DarkModeToggle from "./components/DarkModeToggle";
import TodoList from "./components/Todos/TodoList";
import Toasts from "./components/Toast/Toasts";


const openSans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <main className={`flex min-h-screen flex-col items-center container  mx-auto  p-4 ${openSans.className}`}>
        <header className="flex w-full pb-9 pt-6 justify-between"><h1 className="text-2xl font-bold mb-4">Todo List</h1> <DarkModeToggle /></header>
        <TodoList />
        <Toasts />
      </main>
    </div>
  );
}