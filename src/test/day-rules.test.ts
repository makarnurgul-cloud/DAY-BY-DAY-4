import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {completionRate,localDate} from '@/lib/day';
const sql=readFileSync('supabase/schema.sql','utf8');
describe('Жеке кеңістік ережелері',()=>{
 it('тіркелгенде аты бар профиль автоматты ашылады',()=>{expect(sql).toContain('AFTER INSERT ON auth.users');expect(sql).toContain("NEW.raw_user_meta_data->>'display_name'");});
 it('жеке жазбалар тек иесіне және әкімші оқуына қолжетімді',()=>{expect(sql).toContain("user_id=auth.uid() OR public.has_role(auth.uid(),'admin')");expect(sql).toContain('diary_write');expect(sql).toContain('WITH CHECK(user_id=auth.uid())');});
 it('әкімші рөлі профильде сақталмайды',()=>{const profile=sql.match(/CREATE TABLE public.profiles[^;]+/)?.[0];expect(profile).toBeDefined();expect(profile).not.toContain('role');expect(sql).toContain('GRANT SELECT ON public.user_roles TO authenticated');});
 it('ортақ тапсырма қатысушысы тек өзінің орындау белгісін өзгертеді',()=>{expect(sql).toContain('GRANT UPDATE(completed) ON public.shared_task_members TO authenticated');expect(sql).toContain('members_update');expect(sql).toContain('public.can_read_task(id)');});
 it('әр жаңа кестеде Data API гранты және RLS бар',()=>{for(const name of ['profiles','user_roles','diary_entries','habits','habit_logs','goals','mood_logs','shared_tasks','shared_task_members']){expect(sql).toMatch(new RegExp(`GRANT [^;]+ ON public\\.${name} TO authenticated`));expect(sql).toContain(`ALTER TABLE public.${name} ENABLE ROW LEVEL SECURITY`);}});
 it('орындалу үлесін нақты есептейді',()=>{expect(completionRate(2,4)).toBe(50);expect(completionRate(0,0)).toBe(0);});
 it('күн белгілері жергілікті күнді пайдаланады',()=>{expect(localDate(new Date(2026,10,24,23,30))).toBe('2026-11-24');});
});
