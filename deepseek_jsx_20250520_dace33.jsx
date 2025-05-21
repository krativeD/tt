import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import CompanyForm from './CompanyForm';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/companies');
      setCompanies(res.data);
    } catch (err) {
      message.error('Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry'
    },
    {
      title: 'Members',
      key: 'members',
      render: (_, record) => (
        <Tag color="blue">{record.memberCount || 0} ASAWUSA Members</Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">View Members</Button>
          <Button type="link">Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="company-list">
      <Card 
        title="ASAWUSA Company Management" 
        bordered={false}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Add Company
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={companies} 
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <CompanyForm 
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        refreshList={fetchCompanies}
      />
    </div>
  );
};

export default CompanyList;