import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import Layout from '../components/Layout/Layout';

export default function HomePage() {
  return (
    <>
      <Layout>
        <Welcome />
        <ColorSchemeToggle />
      </Layout>
    </>
  );
}
