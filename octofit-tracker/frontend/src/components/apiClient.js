export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
}

export function normalizeListResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length };
  }

  if (payload && Array.isArray(payload.data)) {
    const count = typeof payload.count === 'number' ? payload.count : payload.data.length;
    return { items: payload.data, count };
  }

  if (payload && Array.isArray(payload.results)) {
    const count = typeof payload.count === 'number' ? payload.count : payload.results.length;
    return { items: payload.results, count };
  }

  return { items: [], count: 0 };
}

export async function fetchComponentData(componentName) {
  const endpoint = `${getApiBaseUrl()}/api/${componentName}/`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const payload = await response.json();
  const normalized = normalizeListResponse(payload);
  return { endpoint, ...normalized };
}

export async function fetchEndpointData(apiPath) {
  const endpoint = `${getApiBaseUrl()}${apiPath}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const payload = await response.json();
  const normalized = normalizeListResponse(payload);
  return { endpoint, ...normalized };
}