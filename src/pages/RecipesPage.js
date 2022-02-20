import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { titlePage } from "../lib/titleHead";
import { getRecipesAction } from "../redux/actions/recipesAction";

function RecipesPage() {
  const dispatch = useDispatch();
  // const getActivities = () => dispatch(TodoActions.getActivitiesRequest());
  useEffect(() => {
    // titlePage({
    //   title: "To Do List - Dashboard",
    // });

    dispatch(getRecipesAction({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>Hallo</div>
    </Suspense>
  );
}

export default RecipesPage;
