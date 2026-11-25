import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/day/workspace';
import { dayQuery } from '@/lib/day.queries';
import { pageHead } from '@/lib/day';
export const Route=createFileRoute('/_authenticated/mood')({
 head:()=>pageHead('Көңіл-күй','day by day ♡ — көңіл-күй үшін жеке кеңістік.'),
 loader:({context})=>context.queryClient.ensureQueryData(dayQuery),
 component:()=> <Workspace section="/mood"/>,
});
