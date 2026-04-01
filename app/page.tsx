import MoonDisplay from "./components/focus/MoonDisplay";
import Pomodoro from "./components/focus/Pomodoro";
import Quotes from "./components/focus/Quotes";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <Quotes />
        <MoonDisplay />
        <Pomodoro />
      </div>
    </main>
  );
}
