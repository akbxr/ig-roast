import RoastForm from "@/components/RoastForm";

export default function Home() {
  return (
    <main className="bg-gray-200 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          Instagram Roaster
        </h1>
        <RoastForm />
      </div>
      <footer className="text-center m-8">
        <p>
          Developed by{" "}
          <a
            href="https://github.com/akbxr"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            @akbxr
          </a>
        </p>
      </footer>
    </main>
  );
}
