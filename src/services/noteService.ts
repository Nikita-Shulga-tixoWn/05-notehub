import axios from "axios";
import type { Note } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNotePayload {
    title: string;
    content: string;
    tag: string;
}

export const fetchNotes = async (
    page: number,
    perPage: number,
    search?: string
): Promise<FetchNotesResponse> => {
    const { data } = await api.get<FetchNotesResponse>("/notes", {
        params: {
            page,
            perPage,
            search,
        },
    });

    return data;
};

export const createNote = async (
    payload: CreateNotePayload
): Promise<Note> => {
    const { data } = await api.post<Note>("/notes", payload);
    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
};
