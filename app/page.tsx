import MoonDisplay from "./components/focus/MoonDisplay";
import Pomodoro from "./components/focus/Pomodoro";
import Quotes from "./components/focus/Quotes";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <Quotes />
        <MoonDisplay />
        {/* <iframe
          src="https://solarsystem.nasa.gov/gltf_embed/2366/"
          className="3d-moon-embed
          "
          style={{ width: "100%", height: "500px", border: "none" }}
        ></iframe> */}
        {/* Pomodoro Timer Section */}
        <Pomodoro />
      </div>
    </main>
  );
}
