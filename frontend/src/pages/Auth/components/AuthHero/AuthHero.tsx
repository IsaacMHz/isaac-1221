const AuthHero = () => {
  return (
    <section className="auth__hero">
      <div className="auth__brand">
        <span className="auth__brand-icon">◉</span>
        <span>SnailRaces</span>
      </div>

      <div className="auth__hero-content">
        <p className="auth__eyebrow">CARRERAS DE CARACOLES</p>

        <h1>
          Pequeñas carreras.
          <br />
          <span>Grandes emociones.</span>
        </h1>

        <p className="auth__description">
          Apuesta, recarga y sigue las carreras de caracoles más rápidas.
        </p>

      </div>

      <div className="auth__features">
        <div className="auth__feature">
          <span>◷</span>

          <div>
            <strong>Carreras</strong>
            <small>en tiempo real</small>
          </div>
        </div>

        <div className="auth__feature">
          <span>◈</span>

          <div>
            <strong>Pagos rápidos</strong>
            <small>con SnailPay</small>
          </div>
        </div>

        <div className="auth__feature">
          <span>▥</span>

          <div>
            <strong>Resultados</strong>
            <small>y estadísticas</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthHero;