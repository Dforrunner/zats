const route = (endpoint: string, params?: Record<string, string>) => {
  let fullRoute = (process.env.API_BASE || '') + endpoint;
  if (params) {
    fullRoute += `?${new URLSearchParams(params)}`;
  }
  return fullRoute;
};

export const GET = {
  Tickets: (params?: Record<string, string>) => route('/api/ticket', params),
  RequestArea: (params?: Record<string, string>) => route('/api/area', params),
  RequestAreas: (params?: Record<string, string>) =>
    route('/api/areas', params),
  RequestQueues: (params?: Record<string, string>) =>
    route('/api/queues', params),
  RequestQueue: (params?: Record<string, string>) =>
    route('/api/queue', params),
};

export const POST = {
  Ticket: (params?: Record<string, string>) => route('/api/ticket', params),
};

export const PUT = {
  Ticket: (params?: Record<string, string>) => route('/api/ticket', params),
};