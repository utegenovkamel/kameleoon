import React, { useEffect, useState } from "react";
import "./style.scss";
import Search from "../../assets/icons/search.svg";
import { useHttp } from "../../hooks/http.hook";
import { SiteI, TestI, SortStatusI, TableColumn } from "../../interfaces";
import classNames from "classnames";
import { Row } from "./Row";
import Loader from "../../components/Loader";

const Dashboard = () => {
    const [search, setSearch] = useState("");
    const [sortStatus, setSortStatus] = useState<SortStatusI>({
        type: "ASC",
        column: "Name",
    });
    const [requestTests, dataTests, loadingTests, errorTests] = useHttp<
        TestI[] | null
    >();
    const [requestSites, dataSites, loadingSites, errorSites] = useHttp<
        SiteI[] | null
    >();

    useEffect(() => {
        requestTests("http://localhost:3100/tests");
        requestSites("http://localhost:3100/sites");
    }, []);

    const searchTests = (sortedTests: TestI[] | undefined) => {
        if (sortedTests) {
            if (search) {
                return sortedTests.filter((test) => {
                    return test.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                });
            } else {
                if (sortedTests) {
                    return sortedTests;
                }
            }
        }
    };

    const sortTests = (tests: TestI[]) => {
        if (tests) {
            if (
                sortStatus.column === "Name" ||
                sortStatus.column === "Type" ||
                sortStatus.column === "Site"
            ) {
                if (sortStatus.type === "ASC") {
                    return tests.sort((a: any, b: any) =>
                        a[sortStatus.column.toLowerCase()].localeCompare(
                            b[sortStatus.column.toLowerCase()]
                        )
                    );
                }
                if (sortStatus.type === "DESC") {
                    return tests.sort((a: any, b: any) =>
                        b[sortStatus.column.toLowerCase()].localeCompare(
                            a[sortStatus.column.toLowerCase()]
                        )
                    );
                }
            }
            if (sortStatus.column === "Status") {
                const orderStatuses = {
                    ONLINE: 1,
                    PAUSED: 2,
                    STOPPED: 3,
                    DRAFT: 4,
                };
                if (sortStatus.type === "ASC") {
                    return tests.sort(
                        (a, b) =>
                            orderStatuses[a.status] - orderStatuses[b.status]
                    );
                }
                if (sortStatus.type === "DESC") {
                    return tests.sort(
                        (a, b) =>
                            orderStatuses[b.status] - orderStatuses[a.status]
                    );
                }
            }
        }
    };

    const getTestWithSite = () => {
        const newTestsWithSite: TestI[] = [];
        if (dataSites && dataTests) {
            dataSites.forEach((site) => {
                dataTests.forEach((test: TestI) => {
                    if (site.id === test.siteId) {
                        const newTest = { ...test, site: site.url };
                        newTestsWithSite.push(newTest);
                    }
                });
            });
        }

        return newTestsWithSite;
    };

    const tests: TestI[] | undefined = searchTests(
        sortTests(getTestWithSite())
    );

    const handleChangeSortStatus = (column: TableColumn) => {
        setSortStatus((prevState) => {
            return {
                type: prevState.type === "ASC" ? "DESC" : "ASC",
                column,
            };
        });
    };

    const changeClassSortType = (column: TableColumn) => {
        return {
            "dashboard__table-th_sort-asc":
                sortStatus.column === column && sortStatus.type === "ASC",
            "dashboard__table-th_sort-desc":
                sortStatus.column === column && sortStatus.type === "DESC",
        };
    };

    const deleteProtocols = (site: string) => {
        return site.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    };

    return (
        <div className="dashboard container">
            <h2 className="dashboard__title page-title">Dashboard</h2>
            <div className="dashboard__search-container">
                <img
                    className="dashboard__search-icon"
                    src={Search}
                    alt="search"
                />
                <input
                    className="dashboard__search"
                    type="text"
                    placeholder="What test are you looking for?"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                    }
                />
                <span className="dashboard__count">
                    {tests ? tests.length : 0} tests
                </span>
            </div>
            <table className="dashboard__table">
                <thead className="dashboard__table-thead">
                    <tr className="dashboard__table-tr">
                        <th
                            className={classNames(
                                "dashboard__table-th",
                                changeClassSortType("Name")
                            )}
                        >
                            <span
                                onClick={() => handleChangeSortStatus("Name")}
                            >
                                Name
                            </span>
                        </th>
                        <th
                            className={classNames(
                                "dashboard__table-th",
                                changeClassSortType("Type")
                            )}
                        >
                            <span
                                onClick={() => handleChangeSortStatus("Type")}
                            >
                                Type
                            </span>
                        </th>
                        <th
                            className={classNames(
                                "dashboard__table-th",
                                changeClassSortType("Status")
                            )}
                        >
                            <span
                                onClick={() => handleChangeSortStatus("Status")}
                            >
                                Status
                            </span>
                        </th>
                        <th
                            className={classNames(
                                "dashboard__table-th",
                                changeClassSortType("Site")
                            )}
                        >
                            <span
                                onClick={() => handleChangeSortStatus("Site")}
                            >
                                Site
                            </span>
                        </th>
                        <th className="dashboard__table-th"></th>
                    </tr>
                </thead>
                <tbody className="dashboard__table-tbody">
                    {!errorTests &&
                        !errorSites &&
                        !loadingTests &&
                        !loadingSites &&
                        tests &&
                        tests.length === 0 && (
                            <tr>
                                <td
                                    className="dashboard__search-error"
                                    colSpan={5}
                                >
                                    <p>
                                        Your search did not match any results.
                                    </p>
                                    <button onClick={() => setSearch("")}>
                                        Reset
                                    </button>
                                </td>
                            </tr>
                        )}
                    {loadingTests && loadingSites && <Loader />}
                    {!!errorTests && <div>{errorTests}</div>}
                    {tests &&
                        tests.length !== 0 &&
                        dataSites &&
                        tests.map((test) => {
                            return (
                                <Row
                                    test={test}
                                    deleteProtocols={deleteProtocols}
                                    key={test.id}
                                />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
