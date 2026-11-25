CREATE TABLE IF NOT EXISTS public.goal_progress_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  log_date date NOT NULL DEFAULT CURRENT_DATE,
  progress integer NOT NULL CHECK (progress BETWEEN 0 AND 100),
  UNIQUE (goal_id, log_date)
);

GRANT SELECT, INSERT, UPDATE ON public.goal_progress_logs TO authenticated;
GRANT ALL ON public.goal_progress_logs TO service_role;
ALTER TABLE public.goal_progress_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY goal_progress_read ON public.goal_progress_logs
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY goal_progress_insert ON public.goal_progress_logs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.goals WHERE id = goal_id AND user_id = auth.uid()));
CREATE POLICY goal_progress_update ON public.goal_progress_logs
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.goals WHERE id = goal_id AND user_id = auth.uid()));
CREATE INDEX IF NOT EXISTS goal_progress_owner_date ON public.goal_progress_logs(user_id, log_date);

-- Start a baseline from today for goals that already exist.
INSERT INTO public.goal_progress_logs (goal_id, user_id, log_date, progress)
SELECT id, user_id, CURRENT_DATE, progress
FROM public.goals
ON CONFLICT (goal_id, log_date) DO NOTHING;
