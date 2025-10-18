export interface Achievement {
  readonly icon: string;
  readonly text: string;
}

export interface ProjectLink {
  readonly icon: string;
  readonly text: string;
  readonly projectId: string;
}

export interface ProjectData {
  readonly icon: string;
  readonly techStack: readonly string[];
  readonly title: string;
  readonly description: string;
  readonly achievements: readonly Achievement[];
  readonly links: readonly ProjectLink[];
}
