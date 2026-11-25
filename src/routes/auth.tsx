import { createFileRoute } from '@tanstack/react-router';
import { AuthScreen } from '@/components/day/auth';
import { pageHead } from '@/lib/day';
export const Route=createFileRoute('/auth')({head:()=>pageHead('Кіру және тіркелу','Өзіңе арналған қауіпсіз кеңістік. Күн сайын өзіңе жақын бол.'),component:AuthScreen});
