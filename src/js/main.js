"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const arr = [
    { prop: 1, name: "one" },
    { prop: 2, name: "two" },
    { prop: 1, name: "first" },
  ];

  const rest = Object.groupBy(arr, ({ prop }) => prop);

  console.log(rest);
});
