export interface LearningResource {
  name: string;
  url: string;
  description: string;
}

export interface ResourceCategory {
  title: string;
  resources: LearningResource[];
}

export interface ServiceResources {
  [key: string]: ResourceCategory;
}

export interface ProjectResources {
  [key: string]: ResourceCategory;
}
