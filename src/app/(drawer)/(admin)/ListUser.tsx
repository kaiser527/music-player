import TableUser from "@/components/admin/user/table/TableUser";
import Access from "@/components/share/Access";
import { ALL_PERMISSION } from "@/constants/permissions";
import React from "react";

const ListUser = () => {
  return (
    <Access permission={ALL_PERMISSION.USER.GET_PAGINATE}>
      <TableUser />
    </Access>
  );
};

export default ListUser;
