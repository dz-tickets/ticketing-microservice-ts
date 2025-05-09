import 'bootstrap/dist/css/bootstrap.css';
import buildClient from "../api/build-client.js";
import Header from "../components/header.js";

const AppComponent = ({Component, pageProps, currentUser}) => {
    return <div>
        <Header currentUser={currentUser}/>
        <Component {...pageProps} />
    </div>;
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser').catch(err => {
        return {data: {}};
    });

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
        pageProps: pageProps,
        currentUser: data.currentUser
    };
};

export default AppComponent;