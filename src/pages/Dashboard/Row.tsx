import React from "react";
import { Link } from "react-router-dom";
import { TestI } from "../../interfaces";
import classNames from "classnames";

type Props = {
    test: TestI;
    deleteProtocols: (site: string) => string;
};

const Row = ({ test, deleteProtocols }: Props) => {
    const domain = deleteProtocols(test.site);

    return (
        <tr className="dashboard__table-tr">
            <td
                className={classNames("dashboard__table-td", {
                    "dashboard__table-td_type-red": test.type === "SERVER_SIDE",
                    "dashboard__table-td_type-blue": test.type === "CLASSIC",
                    "dashboard__table-td_type-purple": test.type === "MVT",
                })}
            >
                {test.name}
            </td>
            <td className="dashboard__table-td">{test.type}</td>
            <td
                className={classNames(
                    "dashboard__table-td dashboard__table-td_weight",
                    {
                        "dashboard__table-td_status-green":
                            test.status === "ONLINE",
                        "dashboard__table-td_status-orange":
                            test.status === "PAUSED",
                        "dashboard__table-td_status-red":
                            test.status === "STOPPED",
                    }
                )}
            >
                {test.status}
            </td>
            <td className="dashboard__table-td">{domain}</td>
            <td className="dashboard__table-td">
                <Link
                    className={classNames("dashboard__table-btn", {
                        "dashboard__table-btn_gray": test.status === "DRAFT",
                    })}
                    to={
                        test.status === "DRAFT"
                            ? `/finalize/${test.id}`
                            : `/results/${test.id}`
                    }
                >
                    {test.status === "DRAFT" ? "Finalize" : "Results"}
                </Link>
            </td>
        </tr>
    );
};

export { Row };
