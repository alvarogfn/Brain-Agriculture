import { useRouteError } from 'react-router';

function FarmerErrorPage() {
  const error = useRouteError();

  return <div>{JSON.stringify(error)}</div>;
}

export default FarmerErrorPage;
