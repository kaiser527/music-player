import TableRole from "@/components/admin/role/table/TableRole";
import Access from "@/components/share/Access";
import { ALL_PERMISSION } from "@/constants/permissions";
import React from "react";

const ListRole = () => {
  return (
    <Access permission={ALL_PERMISSION.ROLE.GET_PAGINATE}>
      <TableRole />
    </Access>
  );
};

export default ListRole;
