import { cn } from "@/lib/utils";
import Footer from "./Footer";

export default function Container({
  fullWidth = false,
  children,
}: {
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "flex flex-col text-sm px-6",
        fullWidth ? "w-screen sm:px-16" : "w-full max-w-[80ch] sm:px-8"
      )}
    >
      {children}

      <div className="max-w-[72ch] w-full mx-auto">
        <Footer />
      </div>
    </main>
  );
}
