import { FC } from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Success: FC = () => (
  <Result
    icon={<SmileOutlined />}
    title="Операция выполнена успешно"
    extra={
      <Button type="primary">
        <Link to="/">На главную</Link>
      </Button>
    }
  />
);

export { Success };
