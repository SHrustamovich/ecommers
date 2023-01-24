import {FC, useState} from 'react'
import { Button, Drawer, Form, Input, InputNumber, Upload } from 'antd'
import {PlusOutlined, UploadOutlined} from '@ant-design/icons'
import useLanguage from '../../hooks/useLanguage';
export const CategoryMadal:FC = () => {
    const [open, setOpen] = useState(false);
    const translate = useLanguage()
    const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };

      const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

    return(
      <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        {translate('create_category')}
      </Button>
      <Drawer
        title={`${translate('create_a_new_category')}`}
        width={820}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
       <Form>
        <Form.Item
        name='name_uz'
        rules={[{required:true}]}
        >
       <Input placeholder={`${translate('name')} uz`}/>
        </Form.Item>
        <Form.Item
        name='name_ru'
        rules={[{required:true}]}
        >
       <Input placeholder={`${translate('name')} ru`}/>
        </Form.Item>
        <Form.Item
        name='slug'
        rules={[{required:true}]}
        >
       <Input placeholder={translate('slug')}/>
        </Form.Item>
        <Form.Item
        name='parent_id'
        rules={[{required:true}]}
        >
       <InputNumber placeholder={translate('parent_id')} style={{width:'220px'}}/>
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
        <Form.Item>
            <Button type="primary" htmlType="submit">
              {translate('submit')}
            </Button>
        </Form.Item>
       </Form>
      </Drawer>
      </>
    )
}