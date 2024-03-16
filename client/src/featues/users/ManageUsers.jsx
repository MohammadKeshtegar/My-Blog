import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import { useUsers } from "./useUsers";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

function ManageUsers() {
  const { data, isLoading } = useUsers();

  if (isLoading) return <Spinner />;

  const { data: users, count } = data;

  const tableHeaderTitles = ["profile picture", "name", "email", "active", "date joined", "delete user"];

  return (
    <div className="relative rounded overflow-hidden">
      <Table columns={tableHeaderTitles.length}>
        <Table.Header headerTitles={tableHeaderTitles} headerStyle={`grid-cols-${tableHeaderTitles.length}`} />

        <Table.Body
          data={users}
          render={(user) => <UserRow key={user._id} user={user} bodyStyle={tableHeaderTitles.length} />}
        />

        {count > 10 && (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        )}
      </Table>
    </div>
  );
}

export default ManageUsers;
