const UserInfos = (props) => {
  return (
    <>
      <h1>User Infos:</h1>
      <p>Balance: {props.balance} ETH</p>
      <p>Public Key: {props.publicKey}</p>
    </>
  );
};
export default UserInfos;
