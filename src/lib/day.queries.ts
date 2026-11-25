import { queryOptions } from '@tanstack/react-query';
import { getDayData,getOverview } from './day.functions';
export const dayQuery=queryOptions({queryKey:['day'],queryFn:()=>getDayData(),staleTime:10000});
export const overviewQuery=queryOptions({queryKey:['overview'],queryFn:()=>getOverview()});
