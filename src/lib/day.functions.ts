import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
async function collect<T>(query: {range:(from:number,to:number)=>PromiseLike<{data:T[]|null,error:unknown}>}) {
 const rows:T[]=[];
 for(let from=0;;from+=1000){const result=await query.range(from,from+999);if(result.error){console.error('[dashboard] Supabase query failed:', result.error);throw new Error('Деректерді жүктеу мүмкін болмады. Қайта көріңіз.');}const batch=result.data??[];rows.push(...batch);if(batch.length<1000)return rows;}
}
export const getDayData = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async ({context}) => {
 const s=context.supabase;const uid=context.userId;
 const [profile,diary,habits,logs,goals,goalProgress,moods,tasks,members,role]=await Promise.all([
 s.from('profiles').select('*').eq('id',uid).single(),collect(s.from('diary_entries').select('*').eq('user_id',uid).order('created_at',{ascending:false}).order('id')),collect(s.from('habits').select('*').eq('user_id',uid).order('created_at').order('id')),collect(s.from('habit_logs').select('*').eq('user_id',uid).order('id')),collect(s.from('goals').select('*').eq('user_id',uid).order('created_at').order('id')),collect(s.from('goal_progress_logs').select('*').eq('user_id',uid).order('log_date').order('id')),collect(s.from('mood_logs').select('*').eq('user_id',uid).order('log_date').order('id')),collect(s.from('shared_tasks').select('*').order('created_at').order('id')),collect(s.from('shared_task_members').select('*').order('id')),s.rpc('has_role',{_user_id:uid,_role:'admin'})]);
 if(profile.error||role.error){if(profile.error)console.error('[dashboard] profiles query failed:',profile.error);if(role.error)console.error('[dashboard] has_role RPC failed:',role.error);throw new Error('Деректерді жүктеу мүмкін болмады.');}
 return {uid,profile:profile.data,diary,habits,logs,goals,goalProgress,moods,tasks,members,admin:role.data??false};
});
export const getOverview=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const s=context.supabase;const role=await s.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(role.error||!role.data)throw new Error('Бұл бет тек әкімшіге арналған.');
 const [profiles,diary,habits,logs,goals,moods,tasks,members]=await Promise.all([collect(s.from('profiles').select('*').order('id')),collect(s.from('diary_entries').select('*').order('id')),collect(s.from('habits').select('*').order('id')),collect(s.from('habit_logs').select('*').order('id')),collect(s.from('goals').select('*').order('id')),collect(s.from('mood_logs').select('*').order('id')),collect(s.from('shared_tasks').select('*').order('id')),collect(s.from('shared_task_members').select('*').order('id'))]);
 return {profiles,diary,habits,logs,goals,moods,tasks,members};
});
