import { Book } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Menu } from "../menu";
import { MobileDrawer } from "../drawer";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 py-2 bg-background/60 backdrop-blur">
      <div className="flex justify-between items-center container mx-auto">
        <Link
          href="/"
          title="Brand Logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Book />
          <span className="font-bold text-xl">ChatPDF</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center">
            <nav className="mr-2">
              <Menu />
            </nav>
            <div className="gap-2 flex">
              {/* <Button asChild variant={"outline"}>
                <Link href="/login">Login</Link>
              </Button> */}
            </div>
          </div>
        </div>

        <div className="block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
};

export default Header;
