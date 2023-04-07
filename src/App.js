import { Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import history from 'libs/history';
import Routes from 'components/Routes'
import routes from 'routes';
import zhCN from 'antd/es/locale/zh_CN';
import './freedomenConfig'
import './App.less';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Routes routes={routes} />
      </Router>
    </ConfigProvider>
  );
}

export default App;
