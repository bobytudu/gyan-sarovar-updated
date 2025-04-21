import React from 'react';
import { Card } from 'antd';

const ParentPortal: React.FC = () => {
  return (
    <div className="p-6">
      <Card title="Parent Portal" className="shadow-sm">
        <p>Content goes here</p>
      </Card>
    </div>
  );
};

export default ParentPortal;