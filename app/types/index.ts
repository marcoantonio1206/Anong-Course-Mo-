// vocabularies (runtime + type)

export const TRAITS = [
    'Analytical_Logic',
    'Quantitative_Math',
    'Physical_Engineering',
    'Spatial_Creative_Design',
    'Biological_Lab_Science',
    'Direct_Healthcare',
    'Animal_Agri_Environment',
    'Creative_Media_Comm',
    'Pedagogy_Instruction',
    'Social_Governance_Law',
    'Business_Operations',
    'Maritime_Aviation_Ops'
] as const;

export type Trait = (typeof TRAITS)[number];

export const CLUSTERS = [
    'agriculture-environment',
    'arts-design-communication',
    'business-management',
    'computing-it',
    'education',
    'engineering-architecture',
    'health-sciences',
    'maritime-aviation',
    'natural-sciences-math',
    'social-sciences-law'
] as const;

export type Cluster = (typeof CLUSTERS)[number];

// trait vectors 

export type TraitVector = Record<Trait, number>;
export type TraitDeltas = Partial<Record<Trait, number>>;

// context annotations

export type ScholarshipPriority = 'high' | 'medium' | 'low' | 'none';
export type AbroadIntent = 'high' | 'medium' | 'low' | 'none';

export interface ContextTag {
    scholarship_priority?: ScholarshipPriority;
    abroad_intent?: AbroadIntent;
}

// options

export interface BaseOption {
    option_id: string;
    text: string;
}

export interface TraitOption extends BaseOption {
    trait_deltas: TraitDeltas;
}

export interface ContextOption extends BaseOption {
    metadata_tag: ContextTag;
}

export type Option = TraitOption | ContextOption;

// questions (discriminated union on 'stage')

export type QuestionStage = 
    | 'Macro_Broad_Cluster'
    | 'Micro_Field_Differentiation'
    | 'Context_Financial_Need'
    | 'Context_Career_Location';

interface BaseQuestion {
    question_id: string;
    question_text: string;
    options: Option[];
}

export interface MacroQuestion extends BaseQuestion {
    stage: 'Macro_Broad_Cluster';
    options: TraitOption[];
}

export interface MicroQuestion extends BaseQuestion {
    stage: 'Micro_Field_Differentiation';
    cluster: Cluster;
    options: TraitOption[];
}

export interface ContextQuestion extends BaseQuestion {
    stage: 'Context_Financial_Need' |
    'Context_Career_Location';
    options: ContextOption[];
}

export type Question = MacroQuestion | MicroQuestion | ContextQuestion;

// course

export type CostTier = 'low' | 'medium' | 'high' | 'very_high';

export interface Course {
    course_name: string;
    traits: TraitVector;
    metadata: {
        board_exam: boolean;
        abroad_demand: 'low' | 'medium' | 'high';
    };
    field_id: Cluster;
    cost_tier: CostTier;
}

// session (quiz runtime state)

export interface Answer {
    question_id: string;
    option_id: string;
}

export interface SessionState {
    answers: Answer[];
    microClusters: Cluster[]; // set after q10 (top 1–2 clusters)
    currentVector: TraitVector; // accumulated trait vector
    context: ContextTag; // annotations only - never scored
}


