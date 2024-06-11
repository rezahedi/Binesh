import Header from "./components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col h-screen min-h-fit">
      <Header />
      <main className="max-w-2xl mx-auto h-full">
        {children}
      </main>
    </div>
  );
}
