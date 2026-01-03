import TablePermission from "@/components/admin/permission/table/TablePermission";
import Access from "@/components/share/Access";
import { ALL_PERMISSION } from "@/constants/permissions";
import React from "react";

const ListPermission = () => {
  return (
    <Access permission={ALL_PERMISSION.PERMISSION.GET_PAGINATE}>
      <TablePermission />
    </Access>
  );
};

export default ListPermission;
