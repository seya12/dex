const NetworkInfo = (props) => {
  return (
    <>
      <h1>Network infos</h1>
      <p>Network ID: {props.id}</p>
      <p>Network Name: {props.name}</p>
      <p>Block Number: {props.blockNumber}</p>
    </>
  );
};
export default NetworkInfo;
