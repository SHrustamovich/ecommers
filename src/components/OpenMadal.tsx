import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { Button, Drawer, Form, Input,Select, Space } from 'antd';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ProductOne:FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
     <Form.Item>
      <strong>Product name uz</strong>
      <Input/>
     </Form.Item>
     <Form.Item>
      <strong>Product name ru</strong>
      <Input/>
     </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const ProductTwo:FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
 
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const ProductThree:FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
 
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};



const { Option } = Select;
const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Tab 1`,
      children: <ProductOne/>,
    },
    {
      key: '2',
      label: `Tab 2`,
      children: <ProductTwo/>,
    },
    {
      key: '3',
      label: `Tab 3`,
      children: <ProductThree/>,
    },
  ];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  
const OpenMadal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onChange = (key: string) => {
    console.log(key);
  };
  
  
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Create product
      </Button>
      <Drawer
        title="Create a new product"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />  
      </Drawer>
    </>
  );
};

export default OpenMadal;

