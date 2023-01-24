import React, { FC, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, InputNumber, Row, Tabs, TabsProps, Upload } from 'antd';
import { Button, Drawer, Form, Input, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useLoad } from '../../hooks/requies';
import { barndsList, categoryList } from '../../utils/urls';
import { brandsI, categoryI } from './types';
import useLanguage from '../../hooks/useLanguage';



const OpenMadal: React.FC = () => {
  const [open, setOpen] = useState(false);
  // categoryId
  const categoryRequest = useLoad<categoryI>({ url: categoryList })
  const { loading, response } = categoryRequest
  const categoryId = response
  // brandsId
  const breandsRequest = useLoad<brandsI>({ url: barndsList })
  // const {loading,response} = breandsRequest
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
// translate
const translate = useLanguage()
const localProduct = localStorage.getItem('language')
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (e: any) => {
    const { prduct_uz, prduct_ru, slug, desc_uz, desc_ru } = e
    console.log(prduct_uz, prduct_ru, slug, desc_uz, desc_ru)
  };

  const ProductOne: FC = () => {
    return (
      <>
      
      </>
    );
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
       {translate('create_pruduct')}
      </Button>
      <Drawer
        title={translate('create_a_new_product')}
        width={920}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
          <Form  onFinish={onFinish}>
          <Row>
           <Col>
           <Form.Item>
              <Button type="primary" htmlType="submit">
                {translate('submit')}
              </Button>
            </Form.Item>
           </Col>
          </Row>
          <Row>
            <Col span={12} style={{ marginRight: '20px' }}>
              <Form.Item name='prduct_uz' rules={[{ required: true }]}>
                <Input placeholder={translate('product_name_uz')} />
              </Form.Item>
              <Form.Item name='prduct_ru' rules={[{ required: true }]}>
                <Input placeholder={translate('product_name_ru')} />
              </Form.Item>
              <Form.Item name='slug' rules={[{ required: true }]}>
                <Input placeholder={translate('slug')} />
              </Form.Item>
              <Form.Item name='desc_uz' rules={[{ required: true }]}>
                <TextArea placeholder={translate('description_uz')} />
              </Form.Item>
              <Form.Item name='desc_ru' rules={[{ required: true }]}>
                <TextArea placeholder={translate('description_ru')} />
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                {
                  <Select
                    placeholder={translate('select_category')}
                    style={{ width: 220 }}
                    onChange={handleChange}
                    options={
                      categoryId?.categories.map(item => (
                        {
                          value: `${item.id}`,
                          label: localProduct == 'uz' ? item.name_uz : item.name_ru
                        }
                      ))
                    }
                  />
                }
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                {
                  <Select
                    placeholder={translate('select_brand')}
                    style={{ width: 220 }}
                    onChange={handleChange}
                    options={
                      breandsRequest.response?.brands.map(item => (
                        {
                          value: `${item.id}`,
                          label: localProduct == 'uz' ? item.name_uz : item.name_ru
                        }
                      ))
                    }
                  />
                }
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                <Input placeholder={translate('attributes')} />
              </Form.Item>
            </Col>
            <Col span={11}>
            <Form.Item rules={[{ required: true }]}>
                <InputNumber placeholder={translate('discount')} />
              </Form.Item>
              <Form.Item name='price' rules={[{ required: true }]}>
                <InputNumber style={{ width: '200px' }} placeholder={translate('price')} />
              </Form.Item>
              <Form.Item name='previous-price' rules={[{ required: true }]}>
                <InputNumber style={{ width: '200px' }} placeholder={translate('previos_price')} />
              </Form.Item>
              <Form.Item name='quantity' rules={[{ required: true }]}>
                <InputNumber style={{ width: '200px' }} placeholder={translate('quantity')} />
              </Form.Item>
              <Form.Item
                name="upload"
                label={translate('upload')}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>{translate('click_to_upload')}</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default OpenMadal;

