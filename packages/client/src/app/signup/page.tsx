import { SignupForm } from '@/features/auth/SignupForm';
import { AuthPageLayout } from '@/ui/auth-page-layout';

export default function LoginPage() {
  return (
    <main>
      <AuthPageLayout
        formTitle='Welcome to CoRide!'
        formSubtitle='Find your commuting partner today!'
        formComponent={<SignupForm />}
        footerLabel='Already registered?'
        footerLinkLabel='Log in here'
        footerLinksTo='/login'
      />
    </main>
  );
}
