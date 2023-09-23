import { LoginForm } from '@/features/auth/LoginForm';
import { AuthPageLayout } from '@/ui/auth-page-layout';

export default function LoginPage() {
  return (
    <main>
      <AuthPageLayout
        formTitle='Welcome Back to CoRide!'
        formSubtitle='Find your commuting partner today!'
        formComponent={<LoginForm />}
        footerLabel="Haven't registered?"
        footerLinkLabel='Sign up here'
        footerLinksTo='/signup'
      />
    </main>
  );
}
