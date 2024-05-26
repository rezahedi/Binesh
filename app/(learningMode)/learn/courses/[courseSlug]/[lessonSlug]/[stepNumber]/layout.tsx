export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <div>Close button</div>
        <div>Progress bar</div>
        <div>Streak or Hearts</div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
