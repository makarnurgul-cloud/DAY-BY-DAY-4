import { createFileRoute } from '@tanstack/react-router';
import { AuthScreen } from '@/components/day/auth';
import { pageHead } from '@/lib/day';
export const Route=createFileRoute('/')({head:()=>pageHead('Өзіме уақыт','day by day ♡ — күнделік, әдеттер және мақсаттар арқылы өзіңе уақыт бөл.'),component:AuthScreen});
