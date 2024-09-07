import {
  LayoutDashboardIcon,
  AddressBookIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItemVendor: menu[] = [
  { header: "Home" },
  {
    title: 'DashBoard',
    icon: LayoutDashboardIcon,
    to: '/'
  }
];

export default sidebarItemVendor;
