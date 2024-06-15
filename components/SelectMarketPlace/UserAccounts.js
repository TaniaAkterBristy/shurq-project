import React, { useEffect, useState } from "react";
import { Button, Space, Table, Card, Empty, Alert, Input } from "antd";
// import { columns } from "./columns";
import PageLoader from "components/PageLoader/PageLoader";
import useUserAccounts from "components/hooks/useUserAccounts";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserAccountsTable = () => {
  
  const router = useRouter();
  const { tableData, loading, error } = useUserAccounts();
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("pagination  ", "sorter", sorter);
    setSortedInfo(sorter);
  };

  const clearAll = () => {
    setSortedInfo({});
  };

  const columns = [
    {
      title: (
        <div className="w-full  flex justify-between items-center gap-3">
          <text>Region Id</text>
          {sortedInfo.order === "ascend" &&
          sortedInfo.columnKey === "region_id" ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : sortedInfo.order === "descend" &&
            sortedInfo.columnKey === "region_id" ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <div className="flex flex-col gap-0">
              <FontAwesomeIcon className="m-0" icon={faCaretUp} />

              <FontAwesomeIcon className="m-0" icon={faCaretDown} />
            </div>
          )}
        </div>
      ),
      dataIndex: "region_id",
      key: "region_id",
      sorter: (a, b) => a.region_id - b.region_id,
      sortOrder: sortedInfo.columnKey === "region_id" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: (
        <div className="w-full  flex items-center justify-between gap-3">
          <text>Seller Id</text>
          {sortedInfo.order === "ascend" &&
          sortedInfo.columnKey === "seller_id" ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : sortedInfo.order === "descend" &&
            sortedInfo.columnKey === "seller_id" ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <div className="flex flex-col gap-0">
              <FontAwesomeIcon className="m-0" icon={faCaretUp} />

              <FontAwesomeIcon className="m-0" icon={faCaretDown} />
            </div>
          )}
        </div>
      ),
      dataIndex: "seller_id",
      key: "seller_id",
      sorter: (a, b) => a.seller_id.length - b.seller_id.length,
      sortOrder: sortedInfo.columnKey === "seller_id" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: (
        <div className="w-full  flex items-center justify-between gap-3">
          <text> Create Date </text>
          {sortedInfo.order === "ascend" &&
          sortedInfo.columnKey === "create_date" ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : sortedInfo.order === "descend" &&
            sortedInfo.columnKey === "create_date" ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <div className="flex flex-col gap-0">
              <FontAwesomeIcon className="m-0" icon={faCaretUp} />

              <FontAwesomeIcon className="m-0" icon={faCaretDown} />
            </div>
          )}
        </div>
      ),
      dataIndex: "create_date",
      key: "create_date",

      sorter: (a, b) => a.create_date.length - b.create_date.length,
      sortOrder:
        sortedInfo.columnKey === "create_date" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: (
        <div className="w-full  flex items-center justify-between gap-3">
          <text> Update Date </text>
          {sortedInfo.order === "ascend" &&
          sortedInfo.columnKey === "update_Date" ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : sortedInfo.order === "descend" &&
            sortedInfo.columnKey === "update_Date" ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <div className="flex flex-col gap-0">
              <FontAwesomeIcon className="m-0" icon={faCaretUp} />

              <FontAwesomeIcon className="m-0" icon={faCaretDown} />
            </div>
          )}
        </div>
      ),
      dataIndex: "update_Date",
      key: "update_Date",
      sortDirections: ["descending", "ascend"],
      sorter: (a, b) => a.update_Date.length - b.update_Date.length,
      sortOrder:
        sortedInfo.columnKey === "update_Date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: (
        <div className="w-full  flex items-center justify-between gap-3">
          <text> Expiry Date </text>
          {sortedInfo.order === "ascend" &&
          sortedInfo.columnKey === "expires_in" ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : sortedInfo.order === "descend" &&
            sortedInfo.columnKey === "expires_in" ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <div className="flex flex-col gap-0">
              <FontAwesomeIcon className="m-0" icon={faCaretUp} />

              <FontAwesomeIcon className="m-0" icon={faCaretDown} />
            </div>
          )}
        </div>
      ),
      dataIndex: "expires_in",
      key: "expires_in",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.expires_in.length - b.expires_in.length,
      sortOrder:
        sortedInfo.columnKey === "expires_in" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  
  return (
    <>
      <style>
        {`
          :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper .ant-table-column-sorter {
             display:none;
            }
       `}
      </style>

      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title="User Accounts"
      >
        <Space
          style={{
            marginBottom: 16,
          }}
        >
          <Button className="bg-blue-600 text-white " onClick={clearAll}>
            Refresh
          </Button>
        </Space>
        <PageLoader loading={loading}>
          {error.error ? (
            <Alert type="error" message={error.errorMessage} />
          ) : (
            <Table
              pagination={{ pageSize: 5 }}
              columns={columns}
              dataSource={tableData}
              onChange={handleChange}
            />
          )}
        </PageLoader>
      </Card>
    </>
  );
};
export default UserAccountsTable;

