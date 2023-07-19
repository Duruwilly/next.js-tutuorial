const UserProfile = (props) => {
  return <div>{props.username}</div>;
};

export default UserProfile;

// getServerSideProps run on the server and fetches data on every request from the client/component on the server and renders the component with the result. hence, this could only be used on pages that should not be pregenerated. Pages with content that are not static or known.
export async function getServerSideProps(context) {

    // getting access to this req can sometimes be important if we need access to the cookies or header data. 
  const { params, req, res } = context;

  return {
    props: {
      username: "MAX",
    },
  };
}
