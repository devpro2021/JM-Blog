import { Result } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/">Back Home</Link>}
    />
  );
};

export { NotFound };
