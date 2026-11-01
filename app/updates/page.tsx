import { Icon } from "@/components/Icon";
import { UpdatesList } from "@/components/UpdatesList";
import { updates } from "@/lib/plans";

export default function UpdatesPage() {
  return (
    <div className="wrap updates-page">
      <h1 className="visually-hidden">全部动态</h1>
      <div className="detail-top">
        <a className="back-arrow" href="/" aria-label="返回首页">
          <Icon name="arrow-left" />
        </a>
      </div>

      <UpdatesList updates={updates} />
    </div>
  );
}
