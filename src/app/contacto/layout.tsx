export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Aqui NÃO chamamos nav nem footer global */}
      {children}
    </>
  );
}
