"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import {
  voteDimensions,
  votePeriods,
  type VoteCandidate,
  type VoteDimensionId,
  type VotePeriod,
  type VoteRankItem,
  type VoteValueRow,
} from "@/lib/vote";

const API = process.env.NEXT_PUBLIC_VOTE_API || "/vote-api";

interface VoteBoardProps {
  candidates: Record<"model" | "plan" | "api", VoteCandidate[]>;
  valueRows: VoteValueRow[];
}

interface Status {
  voted: boolean;
  target: string | null;
}

export function VoteBoard({ candidates, valueRows }: VoteBoardProps) {
  const [dimension, setDimension] = useState<VoteDimensionId>("model_overall");
  const [period, setPeriod] = useState<VotePeriod>("monthly");
  const [rankings, setRankings] = useState<VoteRankItem[]>([]);
  const [status, setStatus] = useState<Status>({ voted: false, target: null });
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const active = voteDimensions.find((item) => item.id === dimension)!;
  const isValue = active.kind === "value";

  const pool: VoteCandidate[] = useMemo(() => {
    if (active.kind === "value") return [];
    return candidates[active.kind];
  }, [active.kind, candidates]);

  const nameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of pool) map.set(item.id, item.name);
    return map;
  }, [pool]);

  const load = useCallback(async () => {
    if (isValue) return;
    setLoading(true);
    setError("");
    try {
      const [rankResponse, statusResponse] = await Promise.all([
        fetch(
          `${API}/rankings?dimension=${encodeURIComponent(dimension)}&period=${period}`,
          { cache: "no-store" },
        ),
        fetch(`${API}/status?dimension=${encodeURIComponent(dimension)}`, {
          cache: "no-store",
        }),
      ]);
      if (!rankResponse.ok || !statusResponse.ok) throw new Error("bad response");
      const rankData = await rankResponse.json();
      const statusData = await statusResponse.json();
      setRankings(rankData.items ?? []);
      setStatus({
        voted: Boolean(statusData.voted),
        target: statusData.target ?? null,
      });
    } catch {
      setRankings([]);
      setStatus({ voted: false, target: null });
      setError("投票服务暂时不可用，稍后再试。");
    } finally {
      setLoading(false);
    }
  }, [dimension, period, isValue]);

  useEffect(() => {
    void load();
  }, [load]);

  async function vote(target: string) {
    if (status.voted || voting) return;
    setVoting(target);
    setError("");
    try {
      const response = await fetch(`${API}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dimension, target }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 409) {
        setStatus({ voted: true, target: data.target ?? target });
        setError("今天已经投过这一项了，明天再来。");
        return;
      }
      if (!response.ok || !data.ok) throw new Error("vote failed");
      setStatus({ voted: true, target });
      await load();
    } catch {
      setError("投票没有成功，请稍后再试。");
    } finally {
      setVoting(null);
    }
  }

  const voteCount = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of rankings) map.set(item.target, item.votes);
    return map;
  }, [rankings]);

  const keyword = query.trim().toLowerCase();
  const filtered = pool.filter((item) => {
    if (!keyword) return true;
    return [item.name, item.provider, item.meta ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(keyword);
  });

  const ranked = filtered
    .filter((item) => (voteCount.get(item.id) ?? 0) > 0)
    .sort((a, b) => (voteCount.get(b.id) ?? 0) - (voteCount.get(a.id) ?? 0));

  const unranked = filtered.filter(
    (item) => (voteCount.get(item.id) ?? 0) === 0,
  );

  const totalVotes = rankings.reduce((sum, item) => sum + item.votes, 0);
  const votedName = status.target ? nameById.get(status.target) : null;

  return (
    <>
      <div className="vote-toolbar">
        <div className="vote-dimensions" role="tablist" aria-label="榜单维度">
          {voteDimensions.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={dimension === item.id}
              className={`vote-chip${dimension === item.id ? " is-active" : ""}`}
              onClick={() => {
                setDimension(item.id);
                setQuery("");
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="vote-meta">
        <p className="vote-hint">{active.hint}</p>
        {!isValue ? (
          <div className="vote-periods" role="tablist" aria-label="榜单周期">
            {votePeriods.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={period === item.id}
                className={`period-chip${period === item.id ? " is-active" : ""}`}
                onClick={() => setPeriod(item.id)}
                title={item.hint}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {isValue ? (
        <ol className="value-list">
          {valueRows.map((row, index) => (
            <li className="value-row" key={row.id}>
              <span className="value-rank">{String(index + 1).padStart(2, "0")}</span>
              <span className="value-main">
                <b>{row.name}</b>
                <span>
                  {row.provider}，{row.price}/ 月，{row.quota} 额度
                </span>
              </span>
              <span className="value-ratio">{row.ratio}×</span>
            </li>
          ))}
        </ol>
      ) : (
        <>
          <div className="vote-summary">
            <span>
              {active.label}，{votePeriods.find((item) => item.id === period)?.label}
            </span>
            <span className="vote-total">{totalVotes} 票</span>
          </div>

          {error ? <p className="vote-error">{error}</p> : null}

          {status.voted ? (
            <p className="vote-done">
              今天已投给 <b>{votedName ?? status.target}</b>，明天再来。
            </p>
          ) : null}

          {loading ? (
            <div className="vote-empty">正在加载榜单…</div>
          ) : ranked.length === 0 ? (
            <div className="vote-empty">
              这一项还没有人投票，投出第一票。
            </div>
          ) : (
            <ol className="vote-list">
              {ranked.map((item, index) => (
                <li className="vote-row" key={item.id}>
                  <span className="vote-rank">{String(index + 1).padStart(2, "0")}</span>
                  <span className="vote-main">
                    <b>{item.name}</b>
                    <span>{item.provider}</span>
                  </span>
                  <span className="vote-count">
                    {(voteCount.get(item.id) ?? 0).toLocaleString("zh-CN")} 票
                  </span>
                  <button
                    type="button"
                    className="vote-button"
                    disabled={status.voted || voting === item.id}
                    onClick={() => void vote(item.id)}
                  >
                    {status.voted
                      ? status.target === item.id
                        ? "已投"
                        : "今日已投"
                      : voting === item.id
                        ? "投票中…"
                        : "投一票"}
                  </button>
                </li>
              ))}
            </ol>
          )}

          <div className="vote-unranked-head">
            <h2>还没得到票的候选</h2>
            <p>得票后才会进入上面的榜单。</p>
          </div>

          <div className="vote-search">
            <Icon name="search" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索模型、厂商…"
              aria-label="搜索候选"
            />
          </div>

          <div className="vote-candidates">
            {unranked.map((item) => (
              <button
                key={item.id}
                type="button"
                className="vote-candidate"
                disabled={status.voted || voting === item.id}
                onClick={() => void vote(item.id)}
                title={`投给 ${item.name}`}
              >
                <span>
                  <b>{item.name}</b>
                  <small>{item.provider}</small>
                </span>
                <span className="vote-candidate-count">
                  {voting === item.id ? "投票中" : "投一票"}
                </span>
              </button>
            ))}
            {unranked.length === 0 ? (
              <p className="vote-empty">
                {keyword ? "没有匹配的候选。" : "所有候选都已经有票了。"}
              </p>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
