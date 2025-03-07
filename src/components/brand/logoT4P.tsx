import React from 'react'
import Link from "next/link";

export const LogoPsystem = () => {
  return (
    <div className="flex gap-5 items-center font-semibold text-xl">
        <Link href={"/"}><span className="font-normal">T<span className="font-bold text-purple-400 text-xl">4</span>P &#123;  <span className="font-light text-purple-400">PSIstem</span> &#125;</span></Link>
      </div>
  )
}
