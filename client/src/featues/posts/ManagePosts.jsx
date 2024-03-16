import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import { usePosts } from "./usePosts";
import Table from "../../ui/Table";
import PostRow from "./PostRow";

function ManagePosts() {
  const { data, isLoading } = usePosts();

  if (isLoading) return <Spinner />;

  const { data: posts, count } = data;

  const tableHeaderTitle = [
    "imag cover",
    "name",
    "short description",
    "category",
    "date created",
    "last update",
    "delete post",
    "update post",
  ];

  return (
    <div className="relative rounded overflow-hidden">
      <Table columns={tableHeaderTitle.length}>
        <Table.Header headerTitles={tableHeaderTitle} headerStyle="grid-cols-8" />

        <Table.Body data={posts} render={(post) => <PostRow key={post._id} post={post} />} />

        {count > 8 && (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        )}
      </Table>
    </div>
  );
}

export default ManagePosts;
