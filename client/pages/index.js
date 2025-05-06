import buildClient from '../api/build-client';

const LandingPage = ({currentUser}) => {
    return currentUser ? (
        <h1>Hello User with email: {currentUser.email}</h1>
    ) : (
        <h1>You are NOT signed in</h1>
    );
};

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser').catch(err => {
        return {data: {}};
    });
    return data;
};

export default LandingPage;