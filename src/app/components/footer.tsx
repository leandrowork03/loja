// src/app/components/Footer.tsx
export function Footer() {
  return (
    <footer className="text-gray-800 py-8 mt-auto text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mt-2 text-sm">
          &copy; {new Date().getFullYear()} DevShop. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}