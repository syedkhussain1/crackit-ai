type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const fetchOpenAIResponse = async (
  messages: Message[],
  onMessage: (message: string) => void
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    onMessage(data.message);
    return data.message;
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    throw error;
  }
}; 