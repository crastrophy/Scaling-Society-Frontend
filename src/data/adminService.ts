export const inviteUser = async (email: string, token: string): Promise<{ok: boolean}> => {
  const response = await fetch('http://localhost:5000/invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ email })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send invite: ${errorText}`);
  }
  
  return response.json();
}; 