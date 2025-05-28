import { HeartPlus, House, ListTodo, MessageCircleMore } from "lucide-react";
export const NavbarList = [
  {
    id: 1,
    name: 'Home',
    icon: House,
    url: '/',
  },
  {
    id: 2,
    name: 'My listings',
    icon: ListTodo,
    url: '/my-listings',
  },
  {
    id: 3,
    name: 'Favourites',
    icon: HeartPlus,
    url: '/favourite',
  },
  {
    id: 4,
    name: 'Messages',
    icon: MessageCircleMore,
    url: '/messages',
  },
]