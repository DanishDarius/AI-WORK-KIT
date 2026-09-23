"use client";
import { useId, useRef, useState } from "react";
import { api } from "@/lib/kit-api";

export function FavoriButton({
  favori,
  titre,
  pending,
  onClick,
}: {
  favori: boolean;
  titre: string;
  pending?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="favorite-button"
      aria-pressed={favori}
      aria-label={`${favori ? "Retirer des" : "Ajouter aux"} favoris : ${titre}`}
      title={favori ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-disabled={pending || undefined}
      onClick={() => {
        if (!pending) onClick();
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="21"
        height="21"
        aria-hidden="true"
        fill={favori ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <path d="m12 3 2.78 5.64 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.9L12 3Z" />
      </svg>
    </button>
  );
}

export type TacheStatus = { fait: boolean; favori: boolean };
export function useTacheActions({
  id,
  metier,
  value,
  onChange,
}: {
  id: string;
  metier: string;
  value: TacheStatus;
  onChange: (patch: Partial<TacheStatus>) => void;
}) {
  const lock = useRef({ fait: false, favori: false });
  const [pending, setPending] = useState({ fait: false, favori: false });
  const [messages, setMessages] = useState({ fait: "", favori: "" });
  async function toggle(field: keyof TacheStatus) {
    if (lock.current[field]) return;
    lock.current[field] = true;
    const previous = value[field];
    const next = !previous;
    setPending((p) => ({ ...p, [field]: true }));
    setMessages((p) => ({ ...p, [field]: "" }));
    onChange({ [field]: next });
    try {
      const result = await api<{
        ok: boolean;
        fait?: boolean;
        favori?: boolean;
      }>(
        `/api/taches/${encodeURIComponent(id)}/${field === "fait" ? "faite" : `favori?metier=${encodeURIComponent(metier)}`}`,
        { method: "POST", body: JSON.stringify({ [field]: next }) },
      );
      if (!result.ok || result[field] !== next)
        throw new Error("L’enregistrement n’a pas été confirmé. Réessayez.");
    } catch (error) {
      onChange({ [field]: previous });
      setMessages((p) => ({
        ...p,
        [field]:
          error instanceof Error
            ? error.message
            : "L’enregistrement a échoué. Réessayez.",
      }));
    } finally {
      lock.current[field] = false;
      setPending((p) => ({ ...p, [field]: false }));
    }
  }
  return { pending, messages, toggle };
}

export function FaitCheckbox({
  fait,
  pending,
  titre,
  onChange,
  fullLabel = false,
}: {
  fait: boolean;
  pending: boolean;
  titre: string;
  onChange: () => void;
  fullLabel?: boolean;
}) {
  const id = useId();
  return (
    <label className="fait-control" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={fait}
        aria-disabled={pending || undefined}
        aria-label={`${fait ? "Marquée comme faite" : "Marquer comme faite"} : ${titre}`}
        onChange={() => {
          if (!pending) onChange();
        }}
      />
      <span>
        {fullLabel
          ? fait
            ? "Cette tâche est faite"
            : "Marquer cette tâche comme faite"
          : fait
            ? "Faite"
            : "À faire"}
      </span>
    </label>
  );
}

export function TacheActions({
  id,
  metier,
  titre,
  value,
  onChange,
}: {
  id: string;
  metier: string;
  titre: string;
  value: TacheStatus;
  onChange: (patch: Partial<TacheStatus>) => void;
}) {
  const actions = useTacheActions({ id, metier, value, onChange });
  return (
    <div className="task-actions">
      <div className="flex items-center justify-between gap-3">
        <FaitCheckbox
          fait={value.fait}
          pending={actions.pending.fait}
          titre={titre}
          onChange={() => actions.toggle("fait")}
        />
        <FavoriButton
          favori={value.favori}
          pending={actions.pending.favori}
          titre={titre}
          onClick={() => actions.toggle("favori")}
        />
      </div>
      {(actions.messages.fait || actions.messages.favori) && (
        <p className="action-error" role="alert">
          {actions.messages.fait || actions.messages.favori}
        </p>
      )}
    </div>
  );
}
