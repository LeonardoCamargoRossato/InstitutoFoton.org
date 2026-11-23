import { siteCards } from '../content/siteCards';
import { siteSections } from '../content/siteStructure';

export type PageAreaDefinition = {
  code: string;
  title: string;
  route: string;
  sectionIds: readonly string[];
  implementation: readonly string[];
  contentSources: readonly string[];
  assetSources: readonly string[];
};

/** Resolve uma área do espelho sem criar uma segunda fonte de conteúdo. */
export function definePageArea(definition: PageAreaDefinition) {
  return {
    ...definition,
    sections: definition.sectionIds.map((id) => {
      const section = siteSections.find((candidate) => candidate.id === id);
      if (!section) throw new Error(`Seção ${id} ausente no catálogo canônico.`);
      return {
        ...section,
        cards: siteCards.filter((card) => card.sectionId === id),
      };
    }),
  } as const;
}
