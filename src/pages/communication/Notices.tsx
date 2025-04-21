import React from 'react';
import { Card } from 'antd';

const NoticeBoard: React.FC = () => {
  return (
    <div className="p-6">
      <Card title="Notice Board" className="shadow-sm">
        <p>Content goes here</p>
      </Card>
    </div>
  );
};

export default NoticeBoard;