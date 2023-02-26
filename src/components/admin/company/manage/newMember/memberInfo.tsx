import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

const TableRow = styled.tr`
  margin-bottom: 5px;
  td {
    border: 1px solid black;
    height: 30px;
    .td {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .btn_box {
      display: flex;
      justify-content: center;
      align-items: center;
      .approve_btn {
        width: 100%;
        height: 100%;
        border: none;
        cursor: pointer;
        transition: all 0.1s linear;
        &:hover {
          background-color: #2e76b6;
          color: white;
        }
      }
      .delete_btn {
        width: 100%;
        height: 100%;
        border: none;
        cursor: pointer;
        transition: all 0.1s linear;
        &:hover {
          background-color: #e74a4a;
          color: white;
        }
      }
    }
  }
`;

const MemberInfo = ({
  id,
  name,
  email,
  number,
  classification,
}: {
  id: number;
  name: string;
  email: string;
  number: string;
  classification: string;
}) => {
  const pathname = useLocation().pathname;
  return (
    <TableRow>
      <td>
        <div className="td">{id}</div>
      </td>
      <td>
        <div className="td">{name}</div>
      </td>
      <td>
        <div className="td">{email}</div>
      </td>
      <td>
        <div className="td">{number}</div>
      </td>
      <td>
        <div className="td">{classification}</div>
      </td>
      <td>
        <div className="btn_box">
          <button className="approve_btn">
            {pathname === "/admin/company-members" ? "정지" : "승인"}
          </button>
        </div>
      </td>
      {pathname === "/admin/company-members" && (
        <td>
          <div className="btn_box">
            <button className="delete_btn">삭제</button>
          </div>
        </td>
      )}
    </TableRow>
  );
};

export default MemberInfo;
