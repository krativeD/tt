import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Upload, Button, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const MemberForm = ({ visible, onCancel, refreshList, companies }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post('/api/members', {
        ...values,
        joinDate: values.joinDate.format('YYYY-MM-DD'),
        address: JSON.stringify(values.address)
      });
      message.success('ASAWUSA member added successfully');
      form.resetFields();
      onCancel();
      refreshList();
    } catch (error) {
      message.error('Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  return (
    <Modal
      title="Add New ASAWUSA Member"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input first name' }]}
            >
              <Input placeholder="Member's first name" />
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input last name' }]}
            >
              <Input placeholder="Member's last name" />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: 'Please select company' }]}
        >
          <Select placeholder="Select company">
            {companies.map(company => (
              <Option key={company._id} value={company._id}>
                {company.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="ASAWUSA Membership ID"
          name="employeeId"
        >
          <Input placeholder="ASW-XXXX" />
        </Form.Item>

        <Form.Item
          label="Member Photo"
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="photo" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        </Form.Item>

        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register ASAWUSA Member
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default MemberForm;