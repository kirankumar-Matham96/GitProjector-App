import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { githubSelector } from "../../redux/githubSlice";

const SearchResults = () => {
  const { repos } = useSelector(githubSelector);
  console.log("\n\n\n🚀 ~ SearchResults ~ repos:", repos, "\n\n\n");
  // const dispatch = useDispatch();

  return (
    <div>
      <h2>Search Results</h2>
      {repos.map((repo) => (
        <div key={repo.id}>{repo.name}</div>
      ))}
    </div>
  );
};

export default SearchResults;
