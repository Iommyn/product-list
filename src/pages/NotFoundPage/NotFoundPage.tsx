import { Button, Typography } from 'antd';
import { RoutePath } from '../../utils/config/routeConfig';
import s from './NotFoundPage.module.css';

const { Title } = Typography;

const NotFoundPage = () => {
  return (
    <main className={s.main}>
      <Title level={1}>Страница не найдена</Title>
      <Button type="link" href={RoutePath.main}>
        На главную
      </Button>
    </main>
  );
};

export default NotFoundPage;
