import Layout from '../Layout';

export default function NuevaPagina() {
  return (
    <Layout>
      <main style={{ paddingTop: '7rem', paddingBottom: '4rem', minHeight: '60vh' }}>
        <div className="wrap">
          <h1>Nueva Página</h1>
          <p>Escribe tu contenido aquí.</p>
        </div>
      </main>
    </Layout>
  );
}
