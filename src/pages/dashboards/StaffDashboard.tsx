import React from "react";
import { Card, Row, Col, Statistic, List, Tag, Table } from "antd";
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
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
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

const StaffDashboard: React.FC = () => {
  // Demo data for statistics
  const stats = {
    totalEmployees: 45,
    averageAttendance: 92,
    onLeave: 3,
    upcomingMeetings: 5,
  };

  // Enhanced performance data with gradient backgrounds
  const performanceData = {
    labels: ["Admin", "IT", "HR", "Finance", "Operations", "Maintenance"],
    datasets: [
      {
        label: "Performance Score",
        data: [88, 92, 85, 90, 87, 86],
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(24, 144, 255, 0.2)");
          gradient.addColorStop(1, "rgba(24, 144, 255, 0.8)");
          return gradient;
        },
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 40,
      },
      {
        label: "Target Score",
        data: [85, 85, 85, 85, 85, 85],
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(145, 202, 255, 0.2)");
          gradient.addColorStop(1, "rgba(145, 202, 255, 0.8)");
          return gradient;
        },
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 40,
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

  // Enhanced bar chart options
  const barOptions = {
    ...commonOptions,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
            weight: "500" as const,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        titleFont: {
          size: 14,
          weight: "600" as const,
        },
        bodyColor: "#666",
        bodyFont: {
          size: 13,
        },
        padding: 12,
        boxPadding: 6,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          padding: 8,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          padding: 8,
          stepSize: 20,
        },
        border: {
          dash: [5, 5],
        },
        min: 0,
        max: 100,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    barPercentage: 0.8,
    categoryPercentage: 0.9,
  };

  // Enhanced attendance data with gradient line
  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Present",
        data: [42, 43, 41, 44, 40],
        borderColor: "#52c41a",
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(82, 196, 26, 0)");
          gradient.addColorStop(1, "rgba(82, 196, 26, 0.2)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#52c41a",
        pointBorderWidth: 2,
      },
      {
        label: "Late",
        data: [2, 1, 3, 1, 4],
        borderColor: "#faad14",
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(250, 173, 20, 0)");
          gradient.addColorStop(1, "rgba(250, 173, 20, 0.2)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#faad14",
        pointBorderWidth: 2,
      },
    ],
  };

  // Enhanced line chart options
  const lineOptions = {
    ...commonOptions,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
            weight: "500" as const,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        titleFont: {
          size: 14,
          weight: "600" as const,
        },
        bodyColor: "#666",
        bodyFont: {
          size: 13,
        },
        padding: 12,
        boxPadding: 6,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          padding: 8,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          padding: 8,
          stepSize: 10,
        },
        border: {
          dash: [5, 5],
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
  };

  // Demo data for department distribution
  const departmentData = {
    labels: ["Admin", "IT", "HR", "Finance", "Operations", "Maintenance"],
    datasets: [
      {
        data: [8, 12, 6, 7, 8, 4],
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

  // Demo data for upcoming events
  const upcomingEvents = [
    {
      title: "Staff Meeting",
      date: "2024-03-25",
      department: "All Staff",
      type: "Meeting",
    },
    {
      title: "Training Session",
      date: "2024-03-28",
      department: "IT",
      type: "Training",
    },
    {
      title: "Performance Review",
      date: "2024-03-30",
      department: "HR",
      type: "Review",
    },
    {
      title: "Team Building",
      date: "2024-04-01",
      department: "All Staff",
      type: "Event",
    },
  ];

  // Demo data for recent leaves
  const recentLeaves = [
    {
      key: "1",
      name: "John Doe",
      department: "IT",
      type: "Sick Leave",
      status: "Approved",
      duration: "2 days",
    },
    {
      key: "2",
      name: "Jane Smith",
      department: "HR",
      type: "Vacation",
      status: "Pending",
      duration: "5 days",
    },
    {
      key: "3",
      name: "Mike Johnson",
      department: "Finance",
      type: "Personal",
      status: "Approved",
      duration: "1 day",
    },
  ];

  // Table columns for recent leaves
  const leaveColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Approved" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

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
              title="Total Employees"
              value={stats.totalEmployees}
              prefix={<TeamOutlined />}
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
              title="On Leave Today"
              value={stats.onLeave}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Upcoming Meetings"
              value={stats.upcomingMeetings}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Tables */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="Department Performance"
            className="shadow-md"
            bodyStyle={{ padding: "20px" }}
          >
            <div style={{ height: "400px" }}>
              <Bar data={performanceData} options={barOptions as any} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Weekly Attendance"
            className="shadow-md"
            bodyStyle={{ padding: "20px" }}
          >
            <div style={{ height: "400px" }}>
              <Line data={attendanceData} options={lineOptions as any} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Staff Distribution by Department">
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
        <Col xs={24} lg={12}>
          <Card title="Upcoming Events">
            <div style={{ height: "400px", overflowY: "auto" }}>
              <List
                dataSource={upcomingEvents}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <>
                          <Tag color="blue">{item.department}</Tag>
                          <Tag color="green">{item.date}</Tag>
                          <Tag color="purple">{item.type}</Tag>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Recent Leave Requests">
            <Table
              dataSource={recentLeaves}
              columns={leaveColumns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDashboard;
