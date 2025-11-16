import { createFileRoute } from '@tanstack/react-router';
import { healthcheckApi } from '~/api';

export const Route = createFileRoute('/_home/')({
  loader: healthcheckApi.getStatus,
  component: RouteComponent,
});

function RouteComponent() {
  const routeData = Route.useLoaderData();
  return <div>Server status: {routeData.data.status}</div>;
}
