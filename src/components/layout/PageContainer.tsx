import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <main className={`container-page py-8 md:py-12 ${className}`}>
      {children}
    </main>
  );
}
