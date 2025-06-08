"use client";

import { Book, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              <Link
                href="/"
                title="Brand Logo"
                className="relative mr-6 flex items-center space-x-2"
              >
                <Book />
                <span className="font-bold text-xl">ChatPDF</span>
              </Link>
            </DrawerTitle>
            <nav>
              <ul className=" text-left font-semibold">
                <li>
                  <Link href="/documents">Documents</Link>
                </li>
              </ul>
            </nav>
          </DrawerHeader>
          <DrawerFooter>
            {/* <Button asChild variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
