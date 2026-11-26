ALTER TABLE public.goals
  ADD COLUMN IF NOT EXISTS goal_date date;

-- Keep existing goals on the local Almaty date when they were created.
UPDATE public.goals
SET goal_date = (created_at AT TIME ZONE 'Asia/Almaty')::date
WHERE goal_date IS NULL;

ALTER TABLE public.goals
  ALTER COLUMN goal_date SET DEFAULT CURRENT_DATE,
  ALTER COLUMN goal_date SET NOT NULL;

CREATE INDEX IF NOT EXISTS goals_owner_date
  ON public.goals(user_id, goal_date);
