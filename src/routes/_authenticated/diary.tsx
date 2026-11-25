import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/day/workspace';
import { dayQuery } from '@/lib/day.queries';
import { pageHead } from '@/lib/day';
export const Route=createFileRoute('/_authenticated/diary')({
 head:()=>pageHead('Күнделік','day by day ♡ — күнделік үшін жеке кеңістік.'),
 loader:({context})=>context.queryClient.ensureQueryData(dayQuery),
 component:()=> <Workspace section="/diary"/>,
});
