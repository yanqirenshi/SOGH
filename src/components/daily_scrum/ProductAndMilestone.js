import React from 'react';

import Product         from './Product.js';
import Sprint          from './Sprint.js';
import ProductOwner    from './ProductOwner.js';
import ScrumMaster     from './ScrumMaster.js';

export default function ProductAndMilestone (props) {
    return (
        <div style={{display:'flex', flexWrap: 'wrap'}}>
            <Product/>
            <Sprint/>
            <ProductOwner />
            <ScrumMaster />
        </div>
    );
}
