import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface CreateNotePayload {
    title: string;
    content: string;
    tag: string;
}

export async function fetchNotes(
    page: number,
    perPage: number,
    search: string
): Promise<FetchNotesResponse> {
    const response = await api.get<FetchNotesResponse>("", {
        params: {
            page,
            perPage,
            search,
        },
    });

    return response.data;
}

export async function createNote(
    payload: CreateNotePayload
): Promise<Note> {
    const response = await api.post<Note>("", payload);
    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await api.delete<Note>(`/${id}`);
    return response.data;
}
