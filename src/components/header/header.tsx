"use client";

import Image from "next/image";
import { ThemeSwitcher } from "../theme/theme-switcher/theme-switcher";
import { AvatarMenu } from "./components/avatar-menu/avatar-menu";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center gap-4 border-b p-4">
      <div className="gap-4 items-center hidden lg:flex">
        <Link href="/">
          <Image alt="Zukese" src={"/logo-login.png"} width={200} className="" height={160} />
        </Link>
      </div>

      <div className="ml-auto flex gap-2">
        <ThemeSwitcher />
        <AvatarMenu />
      </div>
    </header>
  );
}
