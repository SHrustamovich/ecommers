import React, { FC, useState } from 'react';

import { Layout, Menu, theme } from 'antd';
import Logo from '../assets/icon/Logo';
import { NavLink, Route, Routes } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { sidebarData } from '../utils/data';
import { SelectLang } from './SelectLang';
import { routes } from '../utils/routes';
import useAuthentication from '../hooks/useAuth';
import { LoginPage } from '../pages/LoginPage';
import useLanguage from '../hooks/useLanguage';
const { Header, Sider, Content } = Layout;

const Root: FC = () => {
  const { isLoggedIn } = useAuthentication()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgBase },
  } = theme.useToken();
  const info = document.querySelector('.logo-info')
  const handleClick = () => {
     setCollapsed(!collapsed)
     if(!collapsed){
      info?.classList.add('no')
     }else{
      info?.classList.remove('no')
     }
  }
 const translate = useLanguage()
  return (
    <Layout>
      {
        isLoggedIn ? (
          <Layout>
          <Sider style={{ background: '#fff' }} trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <Logo />
            <div className='logo-info'>
              <h1 className='logo-title'>Admin</h1>
              <span className='logo-text'>ecommers</span>
            </div>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            {
              sidebarData.map((sidebarItem) => {
                if(sidebarItem.link.length > 0){
                  return(
                    <Menu.SubMenu key={sidebarItem.id} icon ={React.createElement(sidebarItem.icon)} title={translate(sidebarItem.title)} >
                      {sidebarItem.link.map((item) => {
                        return (
                          <Menu.Item key={item.path}>
                                 <NavLink to={item.path}>
                                     {translate(item.title)}
                                 </NavLink>
                          </Menu.Item>
                        )
                      })}
                    </Menu.SubMenu>
                  )
                }else{
                  return(
                    <Menu.Item key={sidebarItem.id} icon ={React.createElement(sidebarItem.icon)}>
                       <NavLink to={sidebarItem.path}>
                               {translate(sidebarItem.title)}
                       </NavLink>
                    </Menu.Item>
                  )
                }
              })
            }  
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgBase, display: "flex", justifyContent: 'space-between',alignItems:"center"}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: handleClick
            })}
               <SelectLang/>
          </Header>
          <Content
            style={{
              margin: 5,
              padding: 20,
              background: colorBgBase,
            }}
            >
            <Routes>
              {routes.map((route) => (
                <Route
                key={route.id}
                path={route.path}
                element={React.createElement(
                  route.component
                )}
                />
              ))}
            </Routes>
          </Content>
        </Layout>
        </Layout>
        ) : (
          <LoginPage />
        )
      }
    </Layout>
  );
};

export default Root;