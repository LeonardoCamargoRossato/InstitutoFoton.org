// Conteúdo público curado. Minibios pessoais aguardam validação editorial.
export type InstituteMember = {
  id: number; displayName: string; fullName: string; role: string;
  level: 'diretoria' | 'vice-presidencia' | 'coordenacao' | 'adviser';
  thematicLine?: string; photo: string; linkedin?: string; researchGate?: string;
  shortBio?: string; roleDescription: string; bioStatus?: 'pending' | 'validated';
};
export const instituteTeam: InstituteMember[] = [
  {
    "id": 63,
    "displayName": "Leonardo Camargo Rossato",
    "fullName": "Leonardo Camargo Rossato",
    "role": "Presidente",
    "level": "diretoria",
    "photo": "assets/img-diretoria/FotoPerfilLeonardoRossato.webp",
    "linkedin": "https://br.linkedin.com/in/leonardocamargorossato",
    "roleDescription": "Conduz a orientação estratégica, a representação institucional e a articulação do Instituto Foton.",
    "bioStatus": "pending"
  },
  {
    "id": 98,
    "displayName": "Rosângela Viegas Maraschin",
    "fullName": "Rosângela Viegas Maraschin",
    "role": "Vice-Presidente",
    "level": "diretoria",
    "photo": "assets/img-diretoria/FotoPerfilRosangelaMaraschin.webp",
    "linkedin": "https://www.linkedin.com/in/rosangela-viegas-maraschin/",
    "roleDescription": "Apoia a presidência, o alinhamento institucional e a execução das prioridades do Instituto.",
    "bioStatus": "pending"
  },
  {
    "id": 20,
    "displayName": "Danielli Martins Sanderi",
    "fullName": "Danielli Martins Sanderi",
    "role": "Tesoureira",
    "level": "diretoria",
    "photo": "assets/img-diretoria/FotoPerfilDanielliSanderi.webp",
    "linkedin": "https://www.linkedin.com/in/danielli-martins-sanderi/",
    "roleDescription": "Acompanha o planejamento financeiro e apoia a gestão responsável dos recursos institucionais.",
    "bioStatus": "pending"
  },
  {
    "id": 13,
    "displayName": "Cláudio da Silva Dias Junior",
    "fullName": "Cláudio da Silva Dias Junior",
    "role": "Secretário-Geral",
    "level": "diretoria",
    "photo": "assets/img-diretoria/FotoPerfilClaudioDias.webp",
    "roleDescription": "Apoia a organização institucional, os registros e a coordenação administrativa da secretaria-geral.",
    "bioStatus": "pending"
  },
  {
    "id": 15,
    "displayName": "Cynthia Michels",
    "fullName": "Cynthia Michels",
    "role": "VP de Relações Estratégicas",
    "level": "vice-presidencia",
    "photo": "assets/img-diretoria/FotoPerfilCynthiaMichels.webp",
    "linkedin": "https://www.linkedin.com/in/cynthiamichels/",
    "roleDescription": "Articula parcerias, relações estratégicas e conexões com organizações e instituições.",
    "bioStatus": "pending"
  },
  {
    "id": 61,
    "displayName": "Larissa Crestani",
    "fullName": "Larissa Crestani",
    "role": "VP de Pesquisa e Ensino",
    "level": "vice-presidencia",
    "photo": "assets/img-diretoria/FotoPerfilLarissaCrestani.webp",
    "linkedin": "https://br.linkedin.com/in/larissa-crestani-eq",
    "roleDescription": "Articula frentes de pesquisa, formação e colaboração acadêmica.",
    "bioStatus": "pending"
  },
  {
    "id": 21,
    "displayName": "Denicezar Angelo Baldo",
    "fullName": "Denicezar Angelo Baldo",
    "role": "Coordenador científico",
    "level": "coordenacao",
    "thematicLine": "Computação Quântica",
    "photo": "assets/img-diretoria/FotoPerfilDenicezarBaldo.webp",
    "linkedin": "https://br.linkedin.com/in/denicezar-angelo-baldo-3936aa25",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Computação Quântica.",
    "bioStatus": "pending"
  },
  {
    "id": 109,
    "displayName": "Wilson Oliveira da Fonseca",
    "fullName": "Wilson Oliveira da Fonseca",
    "role": "Coordenador científico",
    "level": "coordenacao",
    "thematicLine": "Comunicação e Criptografia Quântica",
    "photo": "assets/img-diretoria/FotoPerfilWilsonFonseca.webp",
    "linkedin": "https://www.linkedin.com/in/fonsecawilsono/",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Comunicação e Criptografia Quântica.",
    "bioStatus": "pending"
  },
  {
    "id": 71,
    "displayName": "Marcelo Weber Schiller",
    "fullName": "Marcelo Weber Schiller",
    "role": "Coordenador científico",
    "level": "coordenacao",
    "thematicLine": "Sensores e Materiais Quânticos",
    "photo": "assets/img-diretoria/FotoPerfilMarceloSchiller.webp",
    "linkedin": "https://br.linkedin.com/in/marcelo-weber-schiller-ph-d-96348a15",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Sensores e Materiais Quânticos.",
    "bioStatus": "pending"
  },
  {
    "id": 110,
    "displayName": "Suzielli Mendonça",
    "fullName": "Suzielli Mendonça",
    "role": "Coordenadora científica",
    "level": "coordenacao",
    "thematicLine": "Algoritmos e Otimização",
    "photo": "assets/img-diretoria/FotoPerfilSuzielliMendonca.webp",
    "linkedin": "https://www.linkedin.com/in/suzielli-mendonca/",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Algoritmos e Otimização.",
    "bioStatus": "pending"
  },
  {
    "id": 65,
    "displayName": "Lucas Friedrich",
    "fullName": "Lucas Friedrich",
    "role": "Coordenador científico",
    "level": "coordenacao",
    "thematicLine": "Algoritmos e Otimização",
    "photo": "assets/img-diretoria/FotoPerfilLucasFriedrich.webp",
    "linkedin": "https://www.linkedin.com/in/lucas-friedrich-807742243/",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Algoritmos e Otimização.",
    "bioStatus": "pending"
  },
  {
    "id": 52,
    "displayName": "Jorge Renato de Souza Verschoore Filho",
    "fullName": "Jorge Renato de Souza Verschoore Filho",
    "role": "Coordenador científico",
    "level": "coordenacao",
    "thematicLine": "Quântica para Negócios",
    "photo": "assets/img-diretoria/FotoPerfilJorgeVerschoore.webp",
    "linkedin": "https://www.linkedin.com/in/jorge-verschoore-475523b4/",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Quântica para Negócios.",
    "bioStatus": "pending"
  },
  {
    "id": 107,
    "displayName": "Viviane Carla Teles Stamm",
    "fullName": "Viviane Carla Teles Stamm",
    "role": "Coordenadora científica",
    "level": "coordenacao",
    "thematicLine": "Quântica para Negócios",
    "photo": "assets/img-diretoria/FotoPerfilVivianeStamm.webp",
    "researchGate": "https://www.researchgate.net/profile/Viviane-Stamm",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Quântica para Negócios.",
    "bioStatus": "pending"
  },
  {
    "id": 18,
    "displayName": "Daniela Pellin",
    "fullName": "Daniela Pellin",
    "role": "Coordenadora científica",
    "level": "coordenacao",
    "thematicLine": "Quantum no Direito",
    "photo": "assets/img-diretoria/FotoPerfilDanielaPellin.webp",
    "linkedin": "https://br.linkedin.com/in/dpellin",
    "roleDescription": "Articula pesquisadores, iniciativas e colaboração interdisciplinar na linha Quantum no Direito.",
    "bioStatus": "pending"
  },
  {
    "id": 64,
    "displayName": "Lester de Abreu Faria",
    "fullName": "Lester de Abreu Faria",
    "role": "Conselheiro / Adviser",
    "level": "adviser",
    "photo": "assets/img-diretoria/FotoPerfilLesterFaria.webp",
    "linkedin": "https://www.linkedin.com/in/lesterfaria/",
    "roleDescription": "Oferece aconselhamento estratégico e contribui com experiência para a atuação institucional.",
    "bioStatus": "pending"
  },
  {
    "id": 45,
    "displayName": "Heber Oliveira Lopes",
    "fullName": "Heber Oliveira Lopes",
    "role": "Conselheiro / Adviser",
    "level": "adviser",
    "photo": "assets/img-diretoria/FotoPerfilHeberLopes.webp",
    "linkedin": "https://www.linkedin.com/in/heberlopesbr/",
    "roleDescription": "Apoia decisões institucionais com aconselhamento e experiência profissional.",
    "bioStatus": "pending"
  },
  {
    "id": 51,
    "displayName": "Jorge Fernando Krug Santos",
    "fullName": "Jorge Fernando Krug Santos",
    "role": "Conselheiro / Adviser",
    "level": "adviser",
    "photo": "assets/img-diretoria/FotoPerfilJorgeKrug.webp",
    "linkedin": "https://www.linkedin.com/in/jorge-krug-4885891/",
    "roleDescription": "Contribui para o direcionamento estratégico e para conexões institucionais.",
    "bioStatus": "pending"
  }
];
