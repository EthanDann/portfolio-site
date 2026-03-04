export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ApiError {
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export async function submitContact(payload: ContactRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

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

