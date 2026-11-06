/**
 * 全站「数据核对」时间。价格核对完成后改这里，页脚和卡片会跟着变。
 */
export const pricesCheckedAt = "2026.11.06";

/** 卡片上用的短格式，例如 11/06。 */
export const pricesCheckedShort = pricesCheckedAt
  .split(".")
  .slice(1)
  .join("/");
