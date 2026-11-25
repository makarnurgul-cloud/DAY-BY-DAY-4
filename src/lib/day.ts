export const sections = [
  { path: '/dashboard', title: 'Менің күнім', icon: 'sun' },
  { path: '/diary', title: 'Күнделік', icon: 'book' },
  { path: '/habits', title: 'Әдеттер', icon: 'leaf' },
  { path: '/goals', title: 'Мақсаттар', icon: 'target' },
  { path: '/mood', title: 'Көңіл-күй', icon: 'heart' },
  { path: '/shared', title: 'Доспен тапсырма', icon: 'users' },
  { path: '/statistics', title: 'Статистика', icon: 'chart' },
] as const;
export type Section = typeof sections[number]['path'] | '/admin';
export function localDate(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function completionRate(done: number, total: number) { return total === 0 ? 0 : Math.round(done / total * 100); }
const months = ['қаңтар','ақпан','наурыз','сәуір','мамыр','маусым','шілде','тамыз','қыркүйек','қазан','қараша','желтоқсан'];
const weekdays = ['Жексенбі','Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма','Сенбі'];
const shortDays = ['Жс','Дс','Сс','Ср','Бс','Жм','Сб'];
export function kazakhDate(date = new Date(), mode: 'full'|'date'|'short' = 'full') { if(mode==='short') return shortDays[date.getDay()] ?? ''; const text = `${date.getDate()} ${months[date.getMonth()] ?? ''}`; return mode==='full' ? `${weekdays[date.getDay()] ?? ''}, ${text}` : text; }
export function pageHead(title: string, description: string) { return {meta:[{title:`${title} · day by day ♡`},{name:'description',content:description},{property:'og:title',content:`${title} · day by day ♡`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }
