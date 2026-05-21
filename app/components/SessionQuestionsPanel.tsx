"use client";

import { useEffect, useState } from "react";
import {
  createSessionQuestion,
  getSessionQuestions,
  upvoteQuestion,
  type Question,
} from "@/app/services/sessionService";

type SessionQuestionsPanelProps = {
  sessionId: number;
  live: boolean;
};

function getVisitorId() {
  const storageKey = "eventsync_visitor_id";

  let visitorId = localStorage.getItem(storageKey);

  if (!visitorId) {
    visitorId = `visitor-${crypto.randomUUID()}`;
    localStorage.setItem(storageKey, visitorId);
  }

  return visitorId;
}

function formatQuestionTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function SessionQuestionsPanel({
  sessionId,
  live,
}: SessionQuestionsPanelProps) {
  const [visitorId, setVisitorId] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sort, setSort] = useState<"upvotes" | "recent">("upvotes");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadQuestions(currentVisitorId: string, currentSort = sort) {
    try {
      setLoading(true);
      setError("");

      const data = await getSessionQuestions(
        sessionId,
        currentVisitorId,
        currentSort
      );

      setQuestions(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les questions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const currentVisitorId = getVisitorId();
    setVisitorId(currentVisitorId);
    loadQuestions(currentVisitorId, sort);
  }, [sessionId]);

  async function handleSortChange(nextSort: "upvotes" | "recent") {
    setSort(nextSort);
    await loadQuestions(visitorId, nextSort);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await createSessionQuestion(sessionId, {
        content: content.trim(),
        authorName: authorName.trim() || undefined,
      });

      setContent("");
      setAuthorName("");

      await loadQuestions(visitorId, sort);
    } catch (err) {
      console.error(err);
      setError("Impossible d’envoyer la question.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpvote(questionId: number) {
    try {
      setError("");

      const updatedQuestion = await upvoteQuestion(questionId, visitorId);

      setQuestions((currentQuestions) =>
        currentQuestions
          .map((question) =>
            question.id === questionId ? updatedQuestion : question
          )
          .sort((a, b) => {
            if (sort === "recent") {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }

            return b.upvoteCount - a.upvoteCount;
          })
      );
    } catch (err) {
      console.error(err);
      setError("Impossible d’ajouter le vote.");
    }
  }

  return (
    <aside className="rounded-3xl border border-white/10 bg-[#0b1020]/80 p-6 shadow-[0_0_45px_rgba(15,23,42,0.45)]">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Questions en direct</h2>
          <p className="mt-1 text-sm text-white/45">
            Les questions les plus votées remontent en premier.
          </p>
        </div>

        <span className="rounded-full bg-violet-600/20 px-4 py-2 text-sm font-semibold text-violet-200">
          {live ? "Live" : "À venir"}
        </span>
      </div>

      {live ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Posez votre question..."
            className="min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-violet-400/60"
          />

          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_130px]">
            <input
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder="Votre nom (optionnel)"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-violet-400/60"
            />

            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-7 text-white/55">
          La section questions sera disponible uniquement lorsque cette session
          sera en direct.
        </div>
      )}

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
            Questions populaires
          </h3>

          <select
            value={sort}
            onChange={(event) =>
              handleSortChange(event.target.value as "upvotes" | "recent")
            }
            className="rounded-xl border border-white/10 bg-[#10172a] px-3 py-2 text-xs text-white/75 outline-none"
          >
            <option value="upvotes">Plus votées</option>
            <option value="recent">Plus récentes</option>
          </select>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-white/45">Chargement des questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-sm text-white/45">
            Aucune question pour le moment.
          </p>
        ) : (
          <div className="space-y-3">
            {questions.map((question) => (
              <article
                key={question.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm leading-6 text-white/80">
                      {question.content}
                    </p>

                    <p className="mt-3 text-xs text-white/35">
                      {question.authorName || "Anonyme"} ·{" "}
                      {formatQuestionTime(question.createdAt)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleUpvote(question.id)}
                    disabled={question.votedByCurrentVisitor}
                    className={`flex min-w-14 flex-col items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      question.votedByCurrentVisitor
                        ? "border-violet-400/40 bg-violet-600/20 text-violet-200"
                        : "border-white/10 bg-white/[0.04] text-white/65 hover:border-violet-400/60 hover:bg-violet-600/20 hover:text-white"
                    } disabled:cursor-not-allowed`}
                  >
                    ▲
                    <span>{question.upvoteCount}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}