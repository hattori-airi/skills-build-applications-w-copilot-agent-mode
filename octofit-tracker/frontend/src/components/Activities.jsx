import { useEffect, useState } from 'react';
import { normalizeListResponse } from './apiClient';

const API_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [endpoint, setEndpoint] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const payload = await response.json();
        const normalized = normalizeListResponse(payload);
        if (!mounted) return;
        setItems(normalized.items);
        setCount(normalized.count);
        setEndpoint(API_ENDPOINT);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="panel">
      <h2>Activities</h2>
      <p className="meta">Endpoint: {endpoint || 'loading...'}</p>
      <p className="meta">Count: {count}</p>
      {loading && <p className="status">Loading activities...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Workout</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id || `${activity.date}-${activity.user?._id || activity.user}` }>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '-'}</td>
                  <td>{activity.user?.name || '-'}</td>
                  <td>{activity.workout?.title || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;