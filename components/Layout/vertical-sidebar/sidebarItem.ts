import {
  LayoutDashboardIcon,
  BooksIcon,
  UsersGroupIcon,
  SettingsCogIcon
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

const sidebarItem: menu[] = [
  { header: "Home" },
  {
    title: 'DashBoard',
    icon: LayoutDashboardIcon,
    to: '/'
  },
  {
    title: 'Projetos',
    icon: BooksIcon,
    to: '/projects',
},
{
  title: 'Time',
  icon: UsersGroupIcon,
  to: '/team',
},
{
  title: 'Configuração Organização',
  icon: SettingsCogIcon,
  to: '/organizations/settings',
},
];

export default sidebarItem;
