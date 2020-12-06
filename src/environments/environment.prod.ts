export const environment = {
  production: true
};

const HERO_URL_API: string = 'https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/'

export const HERO: { [key: string]: { [key: string]: string | { [key: string]: string } } } = {
  CONFIGURATION: {
    TITLE: 'DEV - ECON',
    LIST: {
      TITLE: 'HEROES'
    }
  },
  RESOURCE: {
    LIST: `${HERO_URL_API}all.json`,
    ID: `${HERO_URL_API}id/#{ID}.json`
  }
};