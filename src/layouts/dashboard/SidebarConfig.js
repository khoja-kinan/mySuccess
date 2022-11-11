// component
import Iconify from "../../components/Iconify";
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "specializations",
    path: "/dashboard/specializations",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "privileges",
    path: "/dashboard/privileges",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "medals",
    path: "/dashboard/medals",
    icon: getIcon("bx:medal"),
  },
  {
    title: "countries",
    path: "/dashboard/countries",
    icon: getIcon("gis:search-country"),
  },
  {
    title: "withdraw requests",
    path: "/dashboard/withdraw-requests",
    icon: getIcon("bx:money-withdraw"),
  },
];

export default sidebarConfig;
