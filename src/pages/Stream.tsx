import { Layout, Row, Col, Card, Button, Avatar, Input } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const StreamPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [streams, setStreams] = useState([
    { id: 1, title: "Tech Conference", viewers: 1500 },
    { id: 2, title: "Music Concert", viewers: 4500 },
    { id: 3, title: "Sports Event", viewers: 2000 },
    { id: 4, title: "Art Exhibition", viewers: 1000 },
    { id: 5, title: "Science Fair", viewers: 1200 },
    { id: 6, title: "Technology Workshop", viewers: 1800 },
    { id: 7, title: "Music Festival", viewers: 3500 },
    { id: 8, title: "Sports Tournament", viewers: 2500 },
    
  ]);

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between bg-[#000000]">
        <div className="text-white text-xl font-bold">Stream Platform</div>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Avatar icon={<UserOutlined />} />
            <span className="text-white">Username</span>
            <Button type="primary" danger onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>
        ) : (
          <Button type="primary" onClick={() => setIsLoggedIn(true)}>
            Login
          </Button>
        )}
      </Header>

      <Content className="p-8">
        <div className="mb-6">
          <Search
            placeholder="Search streams..."
            enterButton
            className="max-w-2xl"
          />
        </div>

        <Row gutter={[24, 24]}>
          {streams.map((stream) => (
            <Col key={stream.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<VideoCameraOutlined className="text-4xl p-4" />}
                actions={[
                  <Button type="primary" icon={<VideoCameraOutlined />}>
                    Join Stream
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={stream.title}
                  description={`${stream.viewers.toLocaleString()} viewers`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      <Footer className="text-center bg-red-100">
        Stream Platform ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default StreamPage;
