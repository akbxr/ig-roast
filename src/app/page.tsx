import RoastForm from "@/components/RoastForm";

export default function Home() {
  return (
    <main className="bg-gray-200 min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mb-8">Instagram Roaster</h1>
      <RoastForm />
    </main>
  );
}
