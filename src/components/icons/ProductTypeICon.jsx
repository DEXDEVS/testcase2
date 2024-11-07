import React from 'react';
import { productsTypes } from '../../lib/staticData';
import KitchenTypeIcon from './KitchenTypeIcon';
import WallCabinetIcon from './WallCabinetIcon';

const ProductTypeIcon = ({ type, className }) => {
  if (productsTypes[0] === type)
    return <KitchenTypeIcon className={className} />;
  if (productsTypes[1] === type)
    return <WallCabinetIcon className={className} />;
  if (productsTypes[2] === type)
    return <WallCabinetIcon className={className} />;
  if (productsTypes[3] === type)
    return <WallCabinetIcon className={className} />;

  return <WallCabinetIcon className={className} />;
};

export default ProductTypeIcon;
