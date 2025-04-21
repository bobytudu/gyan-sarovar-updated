import React from "react";
import { Card, Row, Col, Statistic, List, Tag } from "antd";
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
  CheckCircleOutlined,
  ClockCircleOutlined,
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

const TeacherDashboard: React.FC = () => {
  // Demo data for statistics
  const stats = {
    totalStudents: 150,
    activeClasses: 5,
    averageAttendance: 92,
    pendingAssignments: 8,
  };

  // Demo data for class performance
  const performanceData = {
    labels: ["Class A", "Class B", "Class C", "Class D", "Class E"],
    datasets: [
      {
        label: "Average Score",
        data: [85, 78, 92, 88, 76],
        backgroundColor: "#1890ff",
      },
    ],
  };

  // Demo data for attendance trend
  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance Rate",
        data: [95, 88, 92, 90, 94],
        borderColor: "#52c41a",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Demo data for subject distribution
  const subjectData = {
    labels: ["Mathematics", "Science", "English", "History"],
    datasets: [
      {
        data: [30, 25, 25, 20],
        backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
      },
    ],
  };

  // Demo data for upcoming assignments
  const upcomingAssignments = [
    { title: "Mathematics Quiz", dueDate: "2024-03-25", class: "Class A" },
    { title: "Science Project", dueDate: "2024-03-28", class: "Class B" },
    { title: "English Essay", dueDate: "2024-03-30", class: "Class C" },
    { title: "History Test", dueDate: "2024-04-01", class: "Class D" },
  ];

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
              title="Active Classes"
              value={stats.activeClasses}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Attendance"
              value={stats.averageAttendance}
              prefix={<CheckCircleOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pending Assignments"
              value={stats.pendingAssignments}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Lists */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Class Performance">
            <div style={{ height: "400px" }}>
              <Bar data={performanceData} options={commonOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Weekly Attendance">
            <div style={{ height: "400px" }}>
              <Line data={attendanceData} options={commonOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Subject Distribution">
            <div
              style={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "80%", height: "100%" }}>
                <Doughnut data={subjectData} options={doughnutOptions} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Upcoming Assignments">
            <div style={{ height: "400px", overflowY: "auto" }}>
              <List
                dataSource={upcomingAssignments}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <>
                          <Tag color="blue">{item.class}</Tag>
                          <Tag color="green">Due: {item.dueDate}</Tag>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
