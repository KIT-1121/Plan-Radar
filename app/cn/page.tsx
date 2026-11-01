import { DisplayTabs } from "@/components/DisplayTabs";
import { PlanExplorer } from "@/components/PlanExplorer";
import { cnFilters, cnPlans } from "@/lib/plans";

export default function CnPage() {
  return (
    <div className="wrap">
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">Domestic · 6 plans</div>
          <h1 className="display">国内 AI 套餐</h1>
          <p className="lead">
            按套餐看：人民币、美元、积分混着来。按官网原币种展示，不硬换算。
          </p>
        </div>
        <DisplayTabs mode="plans" />
      </div>

      <PlanExplorer
        plans={cnPlans}
        filters={cnFilters}
        ratioLabel="积分效率"
        note="积分不是钱。GLM 与 Trae 的积分体系不同，不能跨供应商比较；这里只展示同一套餐内的「积分 ÷ 价格」。首批收录智谱、字节、阿里，Kimi / MiniMax 正在核验。"
      />
    </div>
  );
}
