import Stats from "stats.js";

export function installStats(el: HTMLElement) {
  // @ts-ignore
  const stats = new Stats();

  el.appendChild(stats.domElement);

  return stats;
}
