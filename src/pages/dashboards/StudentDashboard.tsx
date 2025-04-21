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
  BookOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  CalendarOutlined,
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

const StudentDashboard: React.FC = () => {
  // Demo data for statistics
  const stats = {
    enrolledCourses: 6,
    attendance: 95,
    averageGrade: 88,
    upcomingTests: 3,
  };

  // Demo data for subject performance
  const performanceData = {
    labels: [
      "Mathematics",
      "Science",
      "English",
      "History",
      "Physics",
      "Chemistry",
    ],
    datasets: [
      {
        label: "Current Grade",
        data: [92, 88, 85, 90, 86, 89],
        backgroundColor: "#1890ff",
      },
      {
        label: "Class Average",
        data: [85, 82, 88, 84, 80, 83],
        backgroundColor: "#91caff",
      },
    ],
  };

  // Demo data for attendance trend
  const attendanceData = {
    labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        label: "Attendance Rate",
        data: [98, 95, 92, 96, 94, 95],
        borderColor: "#52c41a",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Demo data for study time distribution
  const studyTimeData = {
    labels: [
      "Mathematics",
      "Science",
      "English",
      "History",
      "Physics",
      "Chemistry",
    ],
    datasets: [
      {
        data: [25, 20, 15, 15, 15, 10],
        backgroundColor: [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#96ceb4",
          "#ffd93d",
          "#6c5ce7",
        ],
      },
    ],
  };

  // Demo data for upcoming assignments
  const upcomingAssignments = [
    {
      title: "Mathematics Assignment 3",
      dueDate: "2024-03-25",
      status: "Pending",
    },
    {
      title: "Physics Lab Report",
      dueDate: "2024-03-28",
      status: "In Progress",
    },
    { title: "English Essay", dueDate: "2024-03-30", status: "Not Started" },
    { title: "Chemistry Quiz", dueDate: "2024-04-01", status: "Pending" },
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

  // Status color mapping
  const getStatusColor = (status: string) => {
    const colors = {
      Pending: "orange",
      "In Progress": "blue",
      "Not Started": "red",
      Completed: "green",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Enrolled Courses"
              value={stats.enrolledCourses}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Attendance Rate"
              value={stats.attendance}
              prefix={<CheckCircleOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Grade"
              value={stats.averageGrade}
              prefix={<TrophyOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Upcoming Tests"
              value={stats.upcomingTests}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Lists */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Subject Performance">
            <div style={{ height: "400px" }}>
              <Bar data={performanceData} options={commonOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Attendance Trend">
            <div style={{ height: "400px" }}>
              <Line data={attendanceData} options={commonOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Study Time Distribution">
            <div
              style={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "80%", height: "100%" }}>
                <Doughnut data={studyTimeData} options={doughnutOptions} />
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
                          <Tag color="blue">Due: {item.dueDate}</Tag>
                          <Tag color={getStatusColor(item.status)}>
                            {item.status}
                          </Tag>
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

export default StudentDashboard;
