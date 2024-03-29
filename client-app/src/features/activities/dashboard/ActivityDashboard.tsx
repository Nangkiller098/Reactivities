/* The code is defining a React component called `ActivityDashboard`. */
import { Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlacholder";

//{activities} as paramameter extent from Props activities
export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, setPaginParams, pagination } =
    activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPaginParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }
  // get data from api using axios by url
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  return (
    <Grid>
      <Grid.Column width="10">
        {activityStore.loadingInitial &&
        activityRegistry.size === 0 &&
        !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
