import RecordButton from "./components/Record";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center pt-48 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold text-black">Cuentanos tu historia</h1>
      <h1 className="text-3xl font-bold text-black mb-48">
        Queremos saber de ti y todas las maravillas que tienes para compartir
      </h1>
      <main className="flex items-center">
        <RecordButton />
      </main>
    </div>
  );
}
