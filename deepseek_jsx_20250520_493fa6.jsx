import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Select } from 'antd';
import { 
  TeamOutlined, 
  BankOutlined, 
  RiseOutlined, 
  FileDoneOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/dashboard?range=${timeRange}`);
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      foreColor: '#333'
    },
    colors: ['#1a5276', '#2980b9'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    xaxis: {
      categories: stats.memberGrowth?.months || [],
    },
    tooltip: { theme: 'light' }
  };

  const chartSeries = [
    {
      name: 'ASAWUSA Members',
      data: stats.memberGrowth?.counts || []
    }
  ];

  return (
    <div className="dashboard">
      <h1 style={{ color: '#1a5276' }}>ASAWUSA Dashboard</h1>
      
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Select 
          defaultValue="month" 
          style={{ width: 120 }}
          onChange={setTimeRange}
        >
          <Select.Option value="week">Last Week</Select.Option>
          <Select.Option value="month">Last Month</Select.Option>
          <Select.Option value="year">Last Year</Select.Option>
        </Select>
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Members"
              value={stats.totalMembers}
              prefix={<TeamOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Represented Companies"
              value={stats.totalCompanies}
              prefix={<BankOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="New Members (30d)"
              value={stats.newMembers}
              prefix={<RiseOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Cases"
              value={stats.activeCases}
              prefix={<FileDoneOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card 
            title="ASAWUSA Membership Growth" 
            loading={loading}
          >
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={350}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Top Companies by Membership" loading={loading}>
            <Table
              columns={[
                { title: 'Company', dataIndex: 'name' },
                { title: 'Members', dataIndex: 'count' }
              ]}
              dataSource={stats.topCompanies}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Member Activity" loading={loading}>
            <Table
              columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'Action', dataIndex: 'action' },
                { title: 'Date', dataIndex: 'date' }
              ]}
              dataSource={stats.recentActivity}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;