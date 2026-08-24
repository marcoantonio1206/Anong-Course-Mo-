export interface Questions {
    id: string;
    text: string;
    trait: string;
}

export interface Course {
    id: string;
    name: string;
    description: string;
    traits: Record<string, number>;
}