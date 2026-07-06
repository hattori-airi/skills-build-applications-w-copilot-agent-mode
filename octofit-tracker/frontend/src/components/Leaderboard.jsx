import { useEffect, useState } from 'react';
import { fetchEndpointData } from './apiClient';

const API_PATH = '/api/leaderboard/';

function Leaderboard() {
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
      <h2>Leaderboard</h2>
      <p className="meta">Endpoint: {endpoint || 'loading...'}</p>
      <p className="meta">Count: {count}</p>
      {loading && <p className="status">Loading leaderboard...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Team</th>
                <th>Top Entries</th>
              </tr>
            </thead>
            <tbody>
              {items.map((board) => (
                <tr key={board._id || `${board.period}-${board.team?._id || 'all'}`}>
                  <td>{board.period}</td>
                  <td>{board.team?.name || 'Global'}</td>
                  <td>
                    {Array.isArray(board.entries)
                      ? board.entries
                          .slice(0, 3)
                          .map((entry) => `${entry.rank}. ${entry.user?.name || 'User'} (${entry.points})`)
                          .join(' | ')
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;