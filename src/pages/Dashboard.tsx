import React from 'react';
import { Card } from "antd";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <Card title="Dashboard" className="shadow-sm">
        <p>Welcome to the main dashboard</p>
      </Card>
    </div>
  );
};

export default Dashboard; 
