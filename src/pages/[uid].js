const UserProfileDetails = (props) => {
  return <div>{props.id}</div>;
};

export default UserProfileDetails;

// if we use this we dont need to use the getStaticPath anymore.
export async function getServerSideProps(context) {
  const { params } = context;

  const userID = params.uid;
  return {
    props: { id: "userID-" + userID },
  };
}
