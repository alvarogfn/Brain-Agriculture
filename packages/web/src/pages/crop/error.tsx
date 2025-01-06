import { useRouteError } from 'react-router';

function CropErrorPage() {
  const error = useRouteError();

  return <div>{JSON.stringify(error)}</div>;
}

export default CropErrorPage;
