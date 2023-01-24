import { FC, useState} from 'react'
import { Button, Drawer, Form, Input, Upload } from 'antd'
import { PlusOutlined, UploadOutlined} from '@ant-design/icons'
import { usePostRequest } from '../../hooks/requies';
import { addbrands } from '../../utils/urls';
import { brandsI } from './types';
import useLanguage from '../../hooks/useLanguage';
export const BrandsModal:FC = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    // post
    const postBrandsRequest = usePostRequest<brandsI>({url:addbrands})
    const normFile = (e: any) => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
      const onFinish = async(e:any) => {
        const {name_uz,name_ru,image} = e
        const {success,error} = await postBrandsRequest.request({
             data:{name_uz,name_ru,image}
        })
      }

      const translate = useLanguage()
    return(
        <>
         <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
             {translate('create_brand')}
         </Button>
         <Drawer
          title={translate('create_a_new_brand')}
          width={820}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
         >
         <Form 
         id='myForm'
         initialValues={{
             remember: true,
         }}
         onFinish={onFinish}
         >

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
           name="image"
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
              {translate('upload')}
            </Button>
        </Form.Item>
         </Form>
         </Drawer>
        </>
    )
}