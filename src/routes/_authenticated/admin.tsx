import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/day/workspace';
import { dayQuery } from '@/lib/day.queries';
import { pageHead } from '@/lib/day';
export const Route=createFileRoute('/_authenticated/admin')({
 head:()=>pageHead('Жалпы шолу','day by day ♡ — жалпы шолу үшін жеке кеңістік.'),
 loader:({context})=>context.queryClient.ensureQueryData(dayQuery),
 component:()=> <Workspace section="/admin"/>,
});
