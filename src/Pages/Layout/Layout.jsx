import { Grid } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export function Layout({ user, setUser, handleLogout }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header user={user} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Outlet setUser={setUser} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
