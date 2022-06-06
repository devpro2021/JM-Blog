import { FC } from 'react';
import 'antd/dist/antd.css';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/store';

const Error: FC = () => {
  const errorMessage = useAppSelector(state => state.app.errorMessage);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Result
      status="error"
      title={errorMessage}
      extra={
        <Button type="primary" onClick={() => goBack()}>
          Вернуться назад
        </Button>
      }
    ></Result>
  );
};

export { Error };
