import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Container, Header } from '~/shared';

const RootLayout = () => (
  <div>
    <Header />
    <Container>
      <Outlet />
    </Container>
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
