import { Button, Layout, Spin } from 'antd';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import s from './App.module.css';
import { RoutePath, routeConfig } from './utils/config/routeConfig';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className={s.page}>
      <Layout className={s.layout}>
        <Header className={s.header}>
          <Button type="link" href={RoutePath.main}>
            Logo
          </Button>
        </Header>
        <Content className={s.content}>
          <Suspense fallback={<Spin size="large" tip="Loading..." />}>
            <Routes>
              {Object.values(routeConfig).map(route => {
                return (
                  <Route key={route.path} path={route.path} element={route.element} />
                );
              })}
            </Routes>
          </Suspense>
        </Content>
        <Footer className={s.footer}>Product-list {new Date().getFullYear()}</Footer>
      </Layout>
    </div>
  );
}

export default App;
