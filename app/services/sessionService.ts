const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export type SessionSpeaker = {
  id: number;
  name: string;
  role: string;
  specialty: string;
  company: string;
  photo?: string | null;
  initials: string;
};

export type SessionDetails = {
  id: number;
  title: string;
  description: string;
  type: string;
  image?: string | null;
  startTime: string;
  endTime: string;
  capacity: number;
  eventId: string;
  eventTitle: string;
  roomId: number;
  roomName: string;
  live: boolean;
  speakers: SessionSpeaker[];
};

export async function getSessionById(id: string): Promise<SessionDetails> {
  const response = await fetch(`${API_BASE_URL}/sessions/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch session details");
  }

  return response.json();
}

export type Question = {
  id: number;
  content: string;
  authorName: string;
  upvoteCount: number;
  createdAt: string;
  sessionId: number;
  votedByCurrentVisitor: boolean;
};

export type QuestionCreatePayload = {
  content: string;
  authorName?: string;
};

export async function getSessionQuestions(
  sessionId: number,
  visitorId: string,
  sort: "upvotes" | "recent" = "upvotes"
): Promise<Question[]> {
  const response = await fetch(
    `${API_BASE_URL}/sessions/${sessionId}/questions?sort=${sort}&visitorId=${visitorId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  return response.json();
}

export async function createSessionQuestion(
  sessionId: number,
  payload: QuestionCreatePayload
): Promise<Question> {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create question");
  }

  return response.json();
}

export async function upvoteQuestion(
  questionId: number,
  visitorId: string
): Promise<Question> {
  const response = await fetch(`${API_BASE_URL}/questions/${questionId}/upvote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ visitorId }),
  });

  if (!response.ok) {
    throw new Error("Failed to upvote question");
  }

  return response.json();
}