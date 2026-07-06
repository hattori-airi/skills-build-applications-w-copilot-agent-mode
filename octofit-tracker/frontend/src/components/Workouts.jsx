import { useEffect, useState } from 'react';
import { fetchEndpointData } from './apiClient';

const API_PATH = '/api/workouts/';

function Workouts() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [endpoint, setEndpoint] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const result = await fetchEndpointData(API_PATH);
        if (!mounted) return;
        setItems(result.items);
        setCount(result.count);
        setEndpoint(result.endpoint);
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
      <h2>Workouts</h2>
      <p className="meta">Endpoint: {endpoint || 'loading...'}</p>
      <p className="meta">Count: {count}</p>
      {loading && <p className="status">Loading workouts...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Intensity</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {items.map((workout) => (
                <tr key={workout._id || workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.category}</td>
                  <td>{workout.intensity}</td>
                  <td>{workout.durationMinutes ?? '-'}</td>
                  <td>{workout.caloriesBurnEstimate ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;