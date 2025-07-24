const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const apiRoutes = {
  INFOS: `${apiUrl}/api/infos`,
  USERS: `${apiUrl}/api/users`,
  MUSICS: `${apiUrl}/api/musics`,
  GIFS: `${apiUrl}/api/pictures`,
  ONEECHO: (id: number) => `${apiUrl}/api/cards/${id}`,
  ALLECHOES: `${apiUrl}/api/cards`,
  MYECHO: (email: string, id: number) =>
    `${apiUrl}/api/users/${email}/cards/${id}`,
  MYECHOES: (email: string) => `${apiUrl}/api/users/${email}/cards`,
  ADDCARD: (email: string) => `${apiUrl}/api/users/${email}/cards`,
  LIKES: (id: number) => `${apiUrl}/api/cards/${id}/likes`,
};

const appRoutes = {
  INFOS: `${appUrl}/infos`,
  INFOS_ID: (id: number) => `${appUrl}/infos/${id}`,
  INFOS_ADD: `${appUrl}/infos/ajouter-info`,
  INFOS_EDIT: (id: number) => `${appUrl}/infos/${id}/editer-info`,
  GIFS: `${appUrl}/Gif`,
};

export { apiRoutes, appRoutes };
