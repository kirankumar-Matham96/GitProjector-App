import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { githubSelector } from "../../redux/githubSlice";
import { useState, useEffect } from "react";
import { IoIosStar, IoMdEye, IoIosBug } from "react-icons/io";
import { FaCodeFork } from "react-icons/fa6";
import Readme from "../../components/Readme";
import Content from "../../components/Content";
import Tags from "../../components/Tags";
import Tag from "../../components/Tag";
import Tabs from "../../components/Tabs";
import { Issues } from "../../components/Issues";
import { Commits } from "../../components/Commits";
import { Chart } from "../../components/Chart";
import styles from "./index.module.scss";

const RepoDetails = () => {
  const tabsList = ["readme", "code", "commits", "issues"];
  const [repo, setRepo] = useState(null);
  const { id } = useParams();
  const { repos, currentTab } = useSelector(githubSelector);

  useEffect(() => {
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
                {repo?.topics && (
                  <Tags className={styles.tags} tags={repo?.topics} />
                )}
              </div>
              <div className={styles.repoStatisticsContainer}>
                <Tag>
                  <IoIosStar className={styles.starIcon} />
                  <p>Starred {repo?.stargazers_count}</p>
                </Tag>
                |
                <Tag>
                  <FaCodeFork className={styles.forkIcon} />
                  <p>Forked {repo?.forks_count}</p>
                </Tag>
                |
                <Tag>
                  <IoMdEye className={styles.eyeIcon} />
                  <p>Watching {repo?.watchers_count}</p>
                </Tag>
                |
                <Tag>
                  <IoIosBug className={styles.bugIcon} />
                  <p>Open Issues {repo?.open_issues}</p>
                </Tag>
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

          <section className={styles.chartAndLinks}>
            <div className={styles.languagesUsedContainer}>
              <h4>Languages Used</h4>
              {repo?.languages && (
                <div className={styles.languageChartAndListContainer}>
                  <Chart className={styles.chart} languages={repo?.languages} />{" "}
                  <ul>
                    {Object.keys(repo?.languages).map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.repoJourneyContainer}>
              <h4>Repo Journey</h4>
              <img
                src="https://next.ossinsight.io/widgets/official/compose-activity-trends/thumbnail.png?repo_id=881876746&image_size=auto"
                alt="repo journey graph"
              />
            </div>
          </section>

          <section className={styles.tabsSection}>
            <Tabs tabs={tabsList} />

            {currentTab === "readme" && (
              <div className={styles.readmeContainer}>
                {repo?.name && <Readme name={repo?.name} />}
              </div>
            )}

            {currentTab === "code" && (
              <div className={styles.codeInsightsContainer}>
                {repo?.name && <Content name={repo?.name} />}
              </div>
            )}

            {currentTab === "commits" && (
              <div className={styles.repoActivityContainer}>
                <h5>📜 Commits</h5>
                {repo?.name && <Commits name={repo?.name} />}
                {/* <p>Commit 1: Message (Author) (Timestamp)</p>
                <p>Commit 2: Message (Author) (Timestamp)</p> */}
              </div>
            )}
            {currentTab === "issues" && (
              <div className={styles.issuesContainer}>
                {repo?.name && <Issues name={repo?.name} />}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default RepoDetails;
