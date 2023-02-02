import { FC, useContext } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Row } from 'antd';
import { usePostRequest } from "../hooks/requies";
import { adminLogin } from "../utils/urls";
import { UserContext } from "../context/UserContext";
interface TipLogin {
    username: string
    password: string
}
interface LoginAuth {
    username: string
    refreshToken: string
    accessToken: string
}
export const LoginPage: FC = () => {
    const loginRequest = usePostRequest<LoginAuth>({ url: adminLogin })
    const { setTokens } = useContext(UserContext)
    async function onFinish(params: TipLogin) {
        const { success, response, error } =
            await loginRequest.request<LoginAuth>({
                data: { username: params.username, password: params.password }
            })
        if (success && !!response) {
            const { accessToken, refreshToken } = response
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            setTokens?.(accessToken, refreshToken)
        }
        if (!success && error) {
            message.warning(error)
        }
    }
    return (
        <Row justify='center' style={{ height: '100%', paddingTop: '160px' }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h3 style={{ paddingBottom: '10px' }}>Enter</h3>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    )
}