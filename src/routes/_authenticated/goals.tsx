import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/day/workspace';
import { dayQuery } from '@/lib/day.queries';
import { pageHead } from '@/lib/day';
export const Route=createFileRoute('/_authenticated/goals')({
 head:()=>pageHead('Мақсаттар','day by day ♡ — мақсаттар үшін жеке кеңістік.'),
 loader:({context})=>context.queryClient.ensureQueryData(dayQuery),
 component:()=> <Workspace section="/goals"/>,
});
