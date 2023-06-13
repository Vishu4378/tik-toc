import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { createContext } from "react";
import Link from "next/link";
import { UserContextType, userContext } from "@/components/Context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { p1, p2, setP1, setP2, setValue, value } =
    useContext<UserContextType>(userContext);

  return (
    <main>
      <div className="flex  items-center justify-center bg-[#171717] h-screen gap-10">
        <form className="flex flex-col items-center justify-center gap-5">
          <div className="space-y-2">
            <label className="flex flex-col font-semibold">
              {" "}
              <span> Player 1</span>
              <input
                required
                className="pl-1 text-center text-black rounded"
                value={p1}
                onChange={(e) => setP1(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-semibold">
              Player 2{" "}
              <input
                required
                className="pl-1 text-center text-black rounded outline-none"
                value={p2}
                onChange={(e) => setP2(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div>
              Choose the <span className="text-red-500 ">Type</span>
            </div>
            <label>
              <input
                value={value}
                required
                className="w-20 text-center text-black rounded-lg"
                onChange={(e) => setValue(+e.target.value)}
              />
            </label>
          </div>
          <div className="relative flex justify-center bg-red-400">
            <button
              type="submit"
              className="absolute px-4 py-1 duration-150 bg-gray-400 rounded-md hover:shadow-xl shadow-gray-400 hover:rounded-sm hover:px-[17px] hover:py-[4.5px] "
            >
              <Link href={"/toc_game"}>Start</Link>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
