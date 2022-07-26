import { Ellipsis} from 'tntd'

import './home.less'

function Home() {
    const foo = () => {
        console.log('fd1asf11ads');
    };

    return (
        <div className="foo" style={{ padding: 20 }} onClick={foo}>
            <h2>home222</h2>
            <p>为啥就是很快，dfafds</p>
            <Ellipsis widthLimit={50} title="测试发到沙发上的方法是否打算发测试发到沙发上的方法是否打算发" />
        </div>
    );
}

export default Home;
