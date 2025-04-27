module.exports = {
  async rewrites() {
    return [
      // {
      //   source: "/",
      //   destination: "/home",
      // },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
