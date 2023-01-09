import { BiCategoryAlt, BiHome, BiPurchaseTagAlt } from 'react-icons/bi';
import { BsListOl } from 'react-icons/bs';
import { MdOutlineInventory2, MdPeopleOutline } from 'react-icons/md';
import { TbWaveSawTool } from 'react-icons/tb';
import Buy from '../Pages/Analytics/Buy';
import Sales from '../Pages/Analytics/Salse';
import Supply from '../Pages/Analytics/Supply';
import BrandList from '../Pages/Brands/BrandList';
import CategoryList from '../Pages/Category/CategoryList';
import ProductList from '../Pages/Products/ProductList';
import AddPurchase from '../Pages/Purchases/AddPurchase';
import PurchaseList from '../Pages/Purchases/PurchaseList';
import Stock from '../Pages/Stocks/Stock';
import SupplierList from '../Pages/Suppliers/SupplierList';

const dhakaManagerRoute = [
  {
    menu: {
      name: 'Dashboard',
      icon: BiHome,

    },
    subMenu: [
      {
        name: 'Sales', icon: TbWaveSawTool, path: '/analytics/sales', component: Sales,
      },
      {
        name: 'Supply', icon: TbWaveSawTool, path: '/analytics/suply', component: Supply,
      },
      {
        name: 'Buy', icon: TbWaveSawTool, path: '/analaytics/buy', component: Buy,
      },
    ],
  },

  {
    menu: {
      name: 'E-commerce',
      icon: BiCategoryAlt,

    },
    subMenu: [
      {
        name: 'Category List', icon: TbWaveSawTool, path: '/category/category-list', component: CategoryList,
      },
      {
        name: 'Brand List', icon: TbWaveSawTool, path: '/brands/brand-list', component: BrandList,
      },
      {
        name: 'Product List', icon: TbWaveSawTool, path: '/product/product-list', component: ProductList,
      }
    ],
  },
  {
    menu: {
      name: 'Purchases',
      icon: BiCategoryAlt,

    },
    subMenu: [
      {
        name: 'Purchase List', icon: BsListOl, path: '/purchase/purchase-list', component: PurchaseList,
      },
      {
        name: 'Add Purchase', icon: BiPurchaseTagAlt, path: '/purchase/add-purchase', component: AddPurchase,
      }
    ],
  },
  {
    menu: {
      name: 'Stocks',
      icon: MdOutlineInventory2,

    },
    subMenu: [
      {
        name: 'Dhaka', icon: TbWaveSawTool, path: '/stocks/chattogram', component: Stock,
      }
    ],
  },
  {
    menu: {
      name: 'People',
      icon: MdPeopleOutline,

    },
    subMenu: [
      {
        name: 'Suppliers', icon: TbWaveSawTool, path: '/people/suppliers', component: SupplierList,
      },
      {
        name: 'Managers', icon: TbWaveSawTool, path: '/people/managers', component: CategoryList,
      },
    ],
  },
];

export default dhakaManagerRoute;
