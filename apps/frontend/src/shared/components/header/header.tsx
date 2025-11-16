import { Container } from '~/shared/components/container/container';

export const Header = () => {
  return (
    <header className="bg-sky-700 text-white py-4 mb-6">
      <Container>
        <h1 className="text-2xl font-bold">Monorepo Template</h1>
      </Container>
    </header>
  );
};
