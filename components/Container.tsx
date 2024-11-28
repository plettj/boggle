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
      <h1 className="mt-12 mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Big Boggle
      </h1>

      <hr />

      <div className="mt-12">{children}</div>

      <div className="max-w-[72ch] w-full mx-auto">
        <Footer />
      </div>
    </main>
  );
}
