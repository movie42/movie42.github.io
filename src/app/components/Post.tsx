"use client";

import * as React from "react";
import { Wrapper } from "./style";
import Link from "next/link";

interface PostProps {
  href: string;
  title?: string;
  date?: string;
}

const Post = ({ href, title, date }: PostProps) => {
  return (
    <Wrapper>
      <Link href={href}>
        <h3>{title}</h3>
        <div className="info_wrapper">
          <span>{date}</span>
        </div>
      </Link>
    </Wrapper>
  );
};

export default Post;
