import api from "./apiSetup";

export const getRecipesApi = async (params) => {
  return api.get("/recipes", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
