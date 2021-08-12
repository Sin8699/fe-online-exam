import { Icon } from '@iconify/react';
import bookFill from '@iconify/icons-eva/book-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import folderFill from '@iconify/icons-eva/folder-fill';
import searchFill from '@iconify/icons-eva/search-fill';
import bookmarkFill from '@iconify/icons-eva/bookmark-fill';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
  },
  {
    title: 'testkit',
    path: '/dashboard/testkit',
    icon: getIcon(folderFill),
  },
  {
    title: 'test user',
    path: '/dashboard/test-user',
    icon: getIcon(bookOpenFill),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill),
  },
  {
    title: 'Online Exam',
    path: '/dashboard/test-exam',
    icon: getIcon(shoppingBagFill),
  },
  {
    title: 'subject',
    path: '/dashboard/subject',
    icon: getIcon(bookmarkFill),
  },
  {
    title: 'course',
    path: '/dashboard/course',
    icon: getIcon(bookFill),
  },
  {
    title: 'find exam subject',
    path: '/dashboard/find-exam-subject',
    icon: getIcon(searchFill),
  },
];

export default sidebarConfig;
