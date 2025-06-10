export function request(url, method, data) {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		cache: 'no-store',
		credentials: 'include',
	}).then((res) => {
		if (res.status === 304) {
			return null;
		}
		return res.json();
	});
}
