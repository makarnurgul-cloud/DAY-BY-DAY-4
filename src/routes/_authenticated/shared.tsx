import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/day/workspace';
import { dayQuery } from '@/lib/day.queries';
import { pageHead } from '@/lib/day';
export const Route=createFileRoute('/_authenticated/shared')({
 head:()=>pageHead('Доспен тапсырма','day by day ♡ — доспен тапсырма үшін жеке кеңістік.'),
 loader:({context})=>context.queryClient.ensureQueryData(dayQuery),
 component:()=> <Workspace section="/shared"/>,
});
