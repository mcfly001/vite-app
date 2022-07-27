import { message } from 'antd';
import dva from 'dva';
import history from './utils/history';
import router from './router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const app = dva({
    history,
    onError(e) {
        message.error(e.message, 3);
    }
});

console.log(app)

app.router(router);
app.start('#root');
