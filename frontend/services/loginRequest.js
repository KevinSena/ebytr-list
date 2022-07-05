export default async function loginRequest(nickname, password) {
  const data = await fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ nickname, password })
  })
  return data.json();
}