import {
    HomeIcon,
    UsersGroupIcon,
    Book2Icon,
    SettingsCogIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    divider?: boolean;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    subCaption?: string;
    class?: string;
    extraclass?: string;
    type?: string;
}

const horizontalItems: menu[] = [
    {
        title: 'Dashboard',
        icon: HomeIcon,
        to: '/',
    },
    {
        title: 'Projetos',
        icon: Book2Icon,
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

export default horizontalItems;
