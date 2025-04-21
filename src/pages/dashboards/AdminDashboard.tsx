import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard: React.FC = () => {
  // Demo data for statistics
  const stats = {
    totalStudents: 1250,
    totalTeachers: 85,
    totalCourses: 32,
    revenue: 125000,
  };

  // Demo data for enrollment trend
  const enrollmentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Student Enrollments",
        data: [65, 75, 85, 80, 90, 95],
        borderColor: "#1890ff",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Demo data for department distribution
  const departmentData = {
    labels: ["Science", "Arts", "Commerce", "Engineering"],
    datasets: [
      {
        data: [300, 250, 200, 500],
        backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
      },
    ],
  };

  // Demo data for fee collection
  const feeCollectionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Fee Collection",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: "#1890ff",
      },
    ],
  };

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  // Specific options for doughnut chart
  const doughnutOptions = {
    ...commonOptions,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={stats.totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Teachers"
              value={stats.totalTeachers}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Courses"
              value={stats.totalCourses}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={stats.revenue}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Enrollment Trend">
            <div style={{ height: "400px" }}>
              <Line data={enrollmentData} options={commonOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Department Distribution">
            <div
              style={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "80%", height: "100%" }}>
                <Doughnut data={departmentData} options={doughnutOptions} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Fee Collection">
            <div style={{ height: "400px" }}>
              <Bar data={feeCollectionData} options={commonOptions} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;


