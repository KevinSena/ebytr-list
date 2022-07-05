export default async function getTasks(token) {
  const data = await fetch('http://localhost:3001/tasks/today', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': token
    },
  });
  return data.json();
}