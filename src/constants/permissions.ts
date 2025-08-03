export const ALL_PERMISSION = {
  USER: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/user", module: "USER" },
    CREATE: { method: "POST", apiPath: "/api/v1/user", module: "USER" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/user/:id", module: "USER" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/user/:id", module: "USER" },
  },
  PERMISSION: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/api/v1/permission",
      module: "PERMISSION",
    },
    CREATE: {
      method: "POST",
      apiPath: "/api/v1/permission",
      module: "PERMISSION",
    },
    UPDATE: {
      method: "PATCH",
      apiPath: "/api/v1/permission/:id",
      module: "PERMISSION",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/api/v1/permission/:id",
      module: "PERMISSION",
    },
  },
  ROLE: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/role", module: "ROLE" },
    CREATE: { method: "POST", apiPath: "/api/v1/role", module: "ROLE" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/role/:id", module: "ROLE" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/role/:id", module: "ROLE" },
  },
  TRACK: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/track", module: "TRACK" },
    CREATE: { method: "POST", apiPath: "/api/v1/track", module: "TRACK" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/track/:id", module: "TRACK" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/track/:id", module: "TRACK" },
  },
  PLAYLIST: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/api/v1/playlist",
      module: "PLAYLIST",
    },
    CREATE: { method: "POST", apiPath: "/api/v1/playlist", module: "PLAYLIST" },
    UPDATE: {
      method: "PATCH",
      apiPath: "/api/v1/playlist/:id",
      module: "PLAYLIST",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/api/v1/playlist/:id",
      module: "PLAYLIST",
    },
  },
};

export const ALL_MODULES = {
  PERMISSION: "PERMISSION",
  ROLE: "ROLE",
  USER: "USER",
  TRACK: "TRACK",
  PLAYLIST: "PLAYLIST",
};
