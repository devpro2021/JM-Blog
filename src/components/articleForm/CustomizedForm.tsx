import { FC } from 'react';
import { Form, Input, Button } from 'antd';

import { ICreateArticle } from 'pages/createArticle/createArticle.types';
import { errorModal } from 'helpers/errorModal';

import s from './articleForm.module.scss';

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface CustomizedFormProps {
  fields: FieldData[];
  title: string;
  submitHandler: (values: ICreateArticle) => void;
}

const CustomizedForm: FC<CustomizedFormProps> = ({
  fields,
  title,
  submitHandler,
}) => {
  const onFinish = (values: ICreateArticle) => {
    submitHandler(values);
  };

  const onFinishFailed = () => {
    errorModal('Заполните все поля');
  };
  return (
    <div className={s['form-wrapper']}>
      <h1 className={s['form__title']}>{title}</h1>
      <Form
        className={s.form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        fields={fields}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className={s['form__label']}
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Поле обязательно к заполнению' }]}
        >
          <Input
            placeholder="Title"
            className={s['form__input']}
            value="sasdasd"
          />
        </Form.Item>

        <Form.Item
          className={s['form__label']}
          label="Short description"
          name="description"
          rules={[{ required: true, message: 'Поле обязательно к заполнению' }]}
        >
          <Input placeholder="Short description" className={s['form__input']} />
        </Form.Item>
        <Form.Item
          className={s['form__label']}
          name="body"
          label="Text"
          rules={[{ required: true, message: 'Поле обязательно к заполнению' }]}
        >
          <Input.TextArea placeholder="Text" className={s['form__textarea']} />
        </Form.Item>

        <div className={s['form__list-wrapper']}>
          <Form.List name="tagList">
            {(fieldsList, { add, remove }) => (
              <>
                <div className={s['form__list']}>
                  {fieldsList.map((field, index) => (
                    <Form.Item
                      className={s.tag}
                      label={index === 0 ? 'Tags' : ''}
                      key={field.key}
                    >
                      <Form.Item {...field} noStyle>
                        <Input
                          placeholder="Tag"
                          style={{ width: '300px' }}
                          className={s['form__input']}
                        />
                      </Form.Item>
                      {fieldsList.length > 0 ? (
                        <Button
                          className={s.form__removeTag}
                          onClick={() => {
                            remove(field.name);
                          }}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </Form.Item>
                  ))}
                </div>
                <Form.Item className={s.form__tagButton}>
                  <Button
                    className={s.form__addTag}
                    type="default"
                    onClick={() => {
                      add();
                    }}
                  >
                    Add tag
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        <Form.Item className={s.form__sendButton}>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { CustomizedForm };
