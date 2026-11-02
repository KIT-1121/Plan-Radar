"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";

export function HeroSearch() {
  const [value, setValue] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    window.location.href = query
      ? `/plans/?q=${encodeURIComponent(query)}`
      : "/plans/";
  }

  return (
    <form className="hero-search" role="search" onSubmit={submit}>
      <Icon name="search" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="搜索模型、套餐或厂商…"
        aria-label="搜索模型、套餐或厂商"
      />
      <button type="submit" className="hero-search-submit" aria-label="搜索">
        <Icon name="arrow" />
      </button>
    </form>
  );
}
