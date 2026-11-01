"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import type { Update } from "@/lib/plans";

const PAGE_SIZE = 6;

export function UpdatesList({ updates }: { updates: Update[] }) {
  const totalPages = Math.max(1, Math.ceil(updates.length / PAGE_SIZE));
  const [page, setPage] = useState(1);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    const index = updates.findIndex((update) => update.id === hash);
    if (index >= 0) {
      setPage(Math.floor(index / PAGE_SIZE) + 1);
    }
  }, [updates]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target) target.scrollIntoView({ block: "start" });
  }, [page]);

  const visible = updates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="updates-list">
        {visible.map((update) => (
          <article className="update-detail" id={update.id} key={update.id}>
            <div className="update-detail-main">
              <div className="update-detail-meta">
                <span className="update-date">{update.date}</span>
                <span className={`update-kind ${update.kind}`}>
                  {update.kind === "api" ? "API" : "套餐"}
                </span>
                <span>{update.provider}</span>
              </div>

              <h2>{update.strong}</h2>
              <p className="update-lead">{update.text}</p>
              <p className="update-summary">{update.summary}</p>
            </div>

            <div className="update-detail-side">
              <ul className="update-points">
                {update.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              <div className="update-links">
                <a className="link-arrow" href={update.related}>
                  查看相关页面 <Icon name="arrow" className="icon icon-sm" />
                </a>
                <a
                  className="link-arrow"
                  href={update.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  官网 <Icon name="external" className="icon icon-sm" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className="updates-pagination" aria-label="动态分页">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            上一页
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const number = index + 1;
            return (
              <button
                type="button"
                key={number}
                className={page === number ? "active" : undefined}
                aria-current={page === number ? "page" : undefined}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
          >
            下一页
          </button>
        </nav>
      ) : null}
    </>
  );
}
