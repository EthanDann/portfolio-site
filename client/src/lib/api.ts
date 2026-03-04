export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ApiError {
  message: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000').replace(/\/$/, '');

export async function submitContact(payload: ContactRequest): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Could not reach the server. If the backend was idle, try again in a minute.',
    );
  }

  if (!response.ok) {
    let message = 'Something went wrong while sending your message.';

    try {
      const data = (await response.json()) as ApiError;
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Fallback to default message, do not leak details
    }

    throw new Error(message);
  }
}

