import Stats from "stats.js";

export function installStats(el: HTMLElement) {
  const stats = new Stats();

  el.appendChild(stats.dom);

  return stats;
}
