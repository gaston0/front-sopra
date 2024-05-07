import {
   IconLayoutDashboard,
   IconAperture
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'List of Users',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Liste of Tags',
    icon: IconAperture,
    href: '/listoftags',
  },
  {
    navlabel: true,
    subheader: 'Ajouter',
  },
  {
    id: uniqueId(),
    title: 'Ajouter Moderateur',
    icon: IconAperture,
    href: '/ajoutermoderateur',
  },
  
  
];

export default Menuitems;
