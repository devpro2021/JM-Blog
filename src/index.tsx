import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { EditProfile } from 'pages/editProfile/EditProfile';
import { Layout } from 'pages/layout';
import { Main } from 'pages/main/Main';
import { SingleArticlePage } from 'pages/singleArticlePage/SingleArticlePage';
import { persistor, store } from 'store/store';
import { SignUp } from 'pages/signUp/SignUp';
import { SignIn } from 'pages/signIn/SignIn';
import { Error } from 'components/error/Error';
import { PrivateRoute } from 'HOC/PrivateRoute';
import { NotFound } from 'pages/notFound/NotFound';
import { CreateArticle } from 'pages/createArticle/CreateArticle';
import { Success } from 'components/success/Success';
import { EditArticle } from 'pages/editArticle/EditArticle';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/articles" element={<Main />} />
            <Route path="/articles/:slug" element={<SingleArticlePage />} />
            <Route
              path="/articles/:slug/edit"
              element={<PrivateRoute component={EditArticle} />}
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/error" element={<Error />} />
            <Route path="/success" element={<Success />} />
            <Route
              path="/profile"
              element={<PrivateRoute component={EditProfile} />}
            />
            <Route
              path="/new-article"
              element={<PrivateRoute component={CreateArticle} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
