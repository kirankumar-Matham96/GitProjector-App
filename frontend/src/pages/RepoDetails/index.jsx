import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { githubSelector } from "../../redux/githubSlice";
import { useState, useEffect } from "react";
import Readme from "../../components/Readme";
import Tags from "../../components/Tags";
import Tag from "../../components/Tag";
import styles from "./index.module.scss";

const RepoDetails = () => {
  const [repo, setRepo] = useState(null);
  const { id } = useParams();
  // const dispatch = useDispatch();
  const { repos } = useSelector(githubSelector);

  useEffect(() => {
    // dispatch(getRepo(title));
    const repoFound = repos.find((repo) => repo.name === id);
    if (!repoFound) {
      setRepo(null);
    }
    setRepo(repoFound);
  }, []);

  return (
    <>
      {!id ? (
        <p>Repo doesn't exists</p>
      ) : (
        <div className={styles.bgContainer}>
          <div className={styles.basicDetailsContainer}>
            <div className={styles.basicDetailsLeft}>
              <a href={repo?.html_url} target="_blank">
                <h3>{repo?.name}</h3>
              </a>
              <p>{repo?.description}</p>
              <div className={styles.repoTags}>
                {repo?.topics && <Tags tags={repo?.topics} />}
              </div>
              <div className={styles.repoStatisticsContainer}>
                <Tag tag={`⭐ Starred ${repo?.stargazers_count}`} />|
                <Tag tag={`🍴 Forked ${repo?.forks_count}`} />|
                <Tag tag={`👁 Watching ${repo?.watchers_count}`} />|
                <Tag tag={`🐛 Open Issues ${repo?.open_issues}`} />
              </div>
            </div>
            <div className={styles.ownerDetails}>
              <a href={repo?.owner?.html_url} target="_blank">
                <p>{repo?.owner?.login}</p>
              </a>
              <img
                className={styles.avatar}
                src={repo?.owner?.avatar_url}
                alt={repo?.owner?.login}
              />
            </div>
          </div>
          {/* <div className={styles.repoStatisticsContainer}>
            <p>
              ⭐ {repo?.stargazers_count} | 🍴 {repo?.forks_count} | 👁{" "}
              {repo?.watchers_count} | 🐛 {repo?.open_issues}
            </p>
          </div> */}
          <div className={styles.additionalMetadataContainer}>
            <p>Languages Used (Chart)</p>
            <ul>
              {repo?.languages?.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
          <div className={styles.repoActivityContainer}>
            <h5>📜 Recent Commits</h5>
            <p>Commit 1: Message (Author) (Timestamp)</p>
            <p>Commit 2: Message (Author) (Timestamp)</p>
          </div>
          <div className={styles.repoLinksAndActionsContainer}>
            <h5>🌐 Links</h5>
            <p>
              <a href={repo?.html_url} target="_blank">
                View on GitHub
              </a>
            </p>
            <p>
              <a href={repo?.clone_url}>Clone URL</a>
            </p>
            <p>Download Zip</p>
          </div>
          <div className={styles.readmeContainer}>
            <h5>📂 README</h5>
            {/* {repo?.name && <Readme name={repo?.name} />} */}
          </div>
          <div className={styles.codeInsightsContainer}>
            <h5>Code</h5>
            <p>Code snippet here with IDE like look</p>
          </div>
          <div className={styles.issuesContainer}>
            <h5>Issues</h5>
            <p>Issues:1</p>
            <p>Issues:2</p>
          </div>
          <div className={styles.discussionsContainer}>
            <h5>Discussions</h5>
            <p>Discussion:1</p>
            <p>Discussion:2</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RepoDetails;
