import React from 'react';
import { Card } from 'antd';

const Messages: React.FC = () => {
  return (
    <div className="p-6">
      <Card title="Messages" className="shadow-sm">
        <p>Content goes here</p>
      </Card>
    </div>
  );
};

export default Messages;