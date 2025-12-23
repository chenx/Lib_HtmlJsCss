import { createContext } from 'react';

export interface FormField {
    id: number;
    title: string;
    description: string;
    display: string;
}

export const FormContext = createContext([]);
// export const GameContext = createContext([]);
