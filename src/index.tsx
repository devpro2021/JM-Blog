import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout';
import { Main } from './components/pages/main/Main';
import { SingleArticlePage } from './components/pages/singleArticlePage/SingleArticlePage';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/articles" element={<Main />} />
          <Route path="/articles/:slug" element={<SingleArticlePage />} />
        </Routes>
      </Layout>
    </Provider>
  </BrowserRouter>,
);
