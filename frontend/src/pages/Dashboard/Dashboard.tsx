import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  PlusOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./Dashboard.css";
import { useState } from "react";
import SnailPayModal from "./components/SnailPayModal/SnailPayModal";
import { useAuth } from "../../context/AuthContext";
import { formatCurrency } from "../../utils/formatCurrency";

const bettingData = [
  {
    name: "Ganadas",
    value: 3,
  },
  {
    name: "Perdidas",
    value: 1,
  },
];

const snailWinsData = [
  {
    name: "Rikochet",
    victorias: 0,
  },
  {
    name: "La Pulga",
    victorias: 2,
  },
  {
    name: "Frijolito",
    victorias: 1,
  },
  {
    name: "Buena niña",
    victorias: 0,
  },
  {
    name: "Mascaracan",
    victorias: 1,
  },
  {
    name: "El rey",
    victorias: 0,
  },
];

const Dashboard = () => {
  const [snailPayOpen, setSnailPayOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1>
            Hola, {user?.fullName} <span>👋</span>
          </h1>

          <p>¿Listo para la próxima carrera?</p>
        </div>

        <Card className="dashboard__balance">
          <div className="dashboard__balance-info">
            <span>Saldo disponible</span>

            <strong>{formatCurrency(user?.balance ?? 0)}</strong>
          </div>

          <Button type="primary" icon={<PlusOutlined />} onClick={() => setSnailPayOpen(true)}>
            Recargar
          </Button>
        </Card>
      </header>

      <Row gutter={[16, 16]} className="dashboard__stats">
        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard__stat-card">
            <Statistic
              title="Carreras hoy"
              value={6}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard__stat-card">
            <Statistic title="Tus apuestas" value={5} prefix={<DollarOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard__stat-card">
            <Statistic title="Ganadas" value={3} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard__stat-card">
            <Statistic
              title="Tasa de acierto"
              value={75}
              suffix="%"
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard__main-content">
        <Col xs={24} lg={16}>
          <div className="dashboard__main-left">
            <Card className="dashboard__race-card">
              <div className="dashboard__race-content">
                <span className="dashboard__race-badge">
                  ● Carrera en vivo
                </span>

                <h2>Slammin' Donuts</h2>

                <p>
                  La carrera más rápida de la temporada
                </p>

                <div className="dashboard__race-meta">
                  <span>6 caracoles</span>
                  <span>En progreso</span>
                </div>

                <Button type="primary">
                  Ver carrera →
                </Button>
              </div>

              <div className="dashboard__race-visual">
                <span>🐌</span>
              </div>
            </Card>

            <Card className="dashboard__next-race-card">
              <div className="dashboard__next-race-info">
                <span className="dashboard__next-race-label">
                  Próxima carrera
                </span>

                <h3>El Lucha Dome</h3>

                <p>
                  La siguiente carrera está por comenzar
                </p>
              </div>

              <div className="dashboard__next-race-time">
                <span>Comienza en</span>
                <strong>25 min</strong>
              </div>

              <div className="dashboard__next-race-meta">
                <span>🐌 6 caracoles</span>
                <span>Hoy · 16:10</span>
              </div>
            </Card>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Apuestas ganadas y perdidas"
            className="dashboard__chart-card"
          >
            <div className="dashboard__pie-wrapper">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={bettingData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={88}
                    paddingAngle={4}
                    animationDuration={400}
                  >
                    <Cell fill="#00bfff" />
                    <Cell fill="#334155" />
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="dashboard__pie-center">
                <strong>4</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="dashboard__legend">
              <div>
                <span className="dashboard__legend-dot dashboard__legend-dot--win" />
                <span>Ganadas:</span>
                <strong>3</strong>
              </div>

              <div>
                <span className="dashboard__legend-dot dashboard__legend-dot--loss" />
                <span>Perdidas:</span>
                <strong>1</strong>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <section className="dashboard__upcoming">
        <div className="dashboard__section-header">
          <div>
            <h2>Próximas carreras</h2>
            <p>Consulta las próximas carreras disponibles</p>
          </div>

          <button type="button">
            Ver todas →
          </button>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="dashboard__upcoming-card">
              <span className="dashboard__upcoming-icon">🐌</span>
              <strong>El Lucha Dome</strong>

              <span>Hoy · 16:10</span>

            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="dashboard__upcoming-card">
              <span className="dashboard__upcoming-icon">🐌</span>

              <strong>Lucha Limbo</strong>

              <span>Mañana · 11:30</span>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="dashboard__upcoming-card">
              <span className="dashboard__upcoming-icon">🐌</span>

              <strong>La Casa de Rikochet</strong>

              <span>Mañana · 15:00</span>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="dashboard__upcoming-card">
              <span className="dashboard__upcoming-icon">🐌</span>

              <strong>La Escuela Internacional de Lucha Libre de Renombre Mundial</strong>

              <span>Mañana · 20:15</span>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="dashboard__wins">
        <div className="dashboard__section-header">
          <div>
            <h2>Victorias por caracol</h2>
            <p>Resultados de las carreras del día</p>
          </div>
        </div>

        <Card className="dashboard__chart-card">
          <div className="dashboard__bar-chart">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={snailWinsData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#142542"
                />

                <XAxis
                  dataKey="name"
                  stroke="#8b93a7"
                />

                <YAxis
                  allowDecimals={false}
                  stroke="#8b93a7"
                />

                <Tooltip
                  cursor={false}
                  labelStyle={{
                    color: "#000000",
                    fontWeight: 600,
                  }}
                  itemStyle={{
                    color: "#00bfff",
                  }}
                />

                <Bar
                  dataKey="victorias"
                  fill="#00bfff"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <SnailPayModal
        open={snailPayOpen}
        onClose={() => setSnailPayOpen(false)}
      />

    </div>
  );
};

export default Dashboard;