function Home() {
    const foo = () => {
        console.log('fd1asf11ads');
    };

    return (
        <div style={{ padding: 20 }} onClick={foo}>
            <h2>home</h2>
            <p>为啥就是很快</p>
        </div>
    );
}

export default Home;
