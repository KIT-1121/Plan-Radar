export function DisplayTabs({
  mode,
}: {
  mode: "plans" | "api" | "models";
}) {
  return (
    <div className="display-tabs">
      <a className={mode === "plans" ? "active" : undefined} href="/plans/">
        按套餐
      </a>
      <a className={mode === "api" ? "active" : undefined} href="/api/">
        按 API
      </a>
      <a className={mode === "models" ? "active" : undefined} href="/models/">
        按模型
      </a>
    </div>
  );
}
