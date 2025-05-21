import React from 'react';
import { Layout, Menu, Image, Typography } from 'antd';
import { Link } from 'react-router-dom';
import asawusaLogo from '../assets/asawusa-logo.png';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const AppLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
          <Image 
            src={asawusaLogo} 
            preview={false}
            height={80}
          />
          <Title level={4} style={{ color: 'white', marginTop: 10 }}>
            ASAWUSA
          </Title>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/members">Member Management</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/companies">Company Management</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/reports">Reports</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/communications">Communications</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div style={{ float: 'right', marginRight: 20 }}>
            {/* User dropdown would go here */}
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ASAWUSA Management System © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;