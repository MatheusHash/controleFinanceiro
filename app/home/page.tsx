export default function Home() {
  const user = {
    name: "teteo",
  };
  return (
    <>
      <section className="w-dvw h-dvh bg-amber-400 text-red-950 ">
        <p>home: {user.name}</p>
      </section>
    </>
  );
}
