import { COPYRIGHT_STRING } from "@/lib/constants";
import NavButton from "./NavButton";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full mt-12">
      <hr />
      <section className="flex flex-col sm:flex-row gap-2 justify-between items-center w-full my-10">
        <nav className="flex gap-1 -ml-2">
          <NavButton href="https://github.com/plettj/boggle" external>
            <GitHubLogoIcon />
            Source Code
          </NavButton>
          <NavButton href="https://plett.dev" external>
            Author
          </NavButton>
        </nav>
        <p className="text-muted-foreground font-thin">{COPYRIGHT_STRING}</p>
      </section>
    </footer>
  );
}
