import {FC} from 'react';
import { Pagination } from 'antd';

const Paginations: FC = () => {
    return(
        <div style={{margin:'0 autol'}}>
            <Pagination  defaultCurrent={10} total={10} />
        </div>
    )
};

export default Paginations;