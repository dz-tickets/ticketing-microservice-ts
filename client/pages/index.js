import buildClient from '../api/build-client';

const LandingPage = ({currentUser}) => {
    console.log(currentUser);
    return <h1>Hello Next.js!</h1>
};

LandingPage.getInitialProps = async (context) => {
    try {
        const client = await buildClient(context);
        const {data} = client.get('/api/users/currentuser');
        return data;
    } catch(err) {
        return err.response.data;
    }
};

export default LandingPage;