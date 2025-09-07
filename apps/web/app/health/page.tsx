export default function HealthPage() {
  return (
    <main style={{ padding: 20, fontFamily: "ui-sans-serif" }}>
      <h1>Health Check</h1>
      <p>
        API: <code>/api/health</code>
      </p>
      <p>Env: {process.env.NEXT_PUBLIC_APP_NAME}</p>
    </main>
  );
}
