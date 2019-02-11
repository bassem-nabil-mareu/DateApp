import { Photo } from './Photo';

export interface User {
    id: number;
    userName: string;
    knownAs: string;
    age: number;
    gender: string;
    createdOn: Date;
    lastActive: Date;
    photoURL: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
