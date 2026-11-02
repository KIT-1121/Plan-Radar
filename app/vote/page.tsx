import { VoteBoard } from "@/components/VoteBoard";
import { apiChannels } from "@/lib/api";
import { modelCatalog } from "@/lib/catalog";
import { allPlans } from "@/lib/plans";
import type { VoteCandidate, VoteValueRow } from "@/lib/vote";

function numberValue(value?: string) {
  if (!value) return null;
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export default function VotePage() {
  const modelCandidates: VoteCandidate[] = modelCatalog.map((model) => ({
    id: model.slug,
    name: model.name,
    provider: model.provider,
    meta: model.note,
  }));

  const planCandidates: VoteCandidate[] = allPlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    provider: plan.provider,
    meta: `${plan.price}${plan.priceUnit}`,
  }));

  const apiCandidates: VoteCandidate[] = apiChannels.map((channel) => ({
    id: channel.id,
    name: channel.name,
    provider: channel.provider,
  }));

  const valueRows: VoteValueRow[] = allPlans
    .filter((plan) => plan.kind === "usd" && !plan.quotaValue.includes("≥"))
    .map((plan) => {
      const price = numberValue(plan.price);
      const quota = numberValue(plan.quotaValue);
      if (!price || !quota) return null;
      return {
        id: plan.id,
        name: plan.name,
        provider: plan.provider,
        price: plan.price,
        quota: plan.quotaValue,
        ratio: Math.round((quota / price) * 10) / 10,
        note: plan.quotaLabel,
      };
    })
    .filter((row): row is VoteValueRow => row !== null)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 20);

  return (
    <div className="wrap vote-page">
      <header className="vote-head">
        <h1 className="display">榜单</h1>
        <p className="lead">
          日榜、周榜、月榜、季榜、年榜，多维度投票。性价比按“额度 ÷ 月费”直接计算；
          其余维度按票数排序，没有票的候选不会上榜。
        </p>
        <p className="vote-rule">每个 IP、每个维度、每天只能投一票。</p>
      </header>

      <VoteBoard
        candidates={{
          model: modelCandidates,
          plan: planCandidates,
          api: apiCandidates,
        }}
        valueRows={valueRows}
      />
    </div>
  );
}
