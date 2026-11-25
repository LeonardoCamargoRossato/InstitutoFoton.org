# `src` structure

`src/` contains the React application source code. The folders below define the main architectural boundaries of the product.

| Folder        | Short description        | Keywords                                       | Detailed purpose                                                                                                                   |
| ------------- | ------------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `app/`        | Application frame        | layout, navigation, global shell               | Owns the shared application frame, global layout, navigation, footer, and site-wide composition.                                   |
| `components/` | Visual component library | UI, cards, galleries, animation, design system | Contains reusable visual structures that can be used by multiple features and pages without owning editorial data.                 |
| `content/`    | Editorial data           | copy, catalogs, partners, publications         | Centralizes text, catalogs, public documents, partner data, news, and other content consumed by the interface.                     |
| `features/`   | Product functionality    | research, partners, manifesto, social, support | Combines reusable components, content, and product rules into complete Instituto Foton experiences.                                |
| `lib/`        | Shared utilities         | configuration, assets, hooks, adapters         | Provides generic support code without a visual identity, such as configuration, asset resolution, and asynchronous-resource hooks. |
| `pages/`      | Page mirror              | routes, sections, navigation map               | Documents the site's human-readable page structure and links each section to its canonical implementation.                         |
| `styles/`     | Style layers             | CSS, responsive, tokens, layout                | Contains global styles and area-specific styles that support the design system and page experiences.                               |

## Files

- `main.tsx`: React application entry point and route composition.

Relevant folders have their own README. Editorial content, visual presentation, product functionality, and infrastructure must remain separate.
