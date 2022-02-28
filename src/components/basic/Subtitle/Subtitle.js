import  styles from './Subtitle.module.scss';

import {  Link } from "react-router-dom";

import { IoIosArrowRoundBack } from 'react-icons/io'



export default function Subtitle({ type, data }) {

    const subtitle = () => {
        if ( !type && data ) {
            return (
                <Link to="/">
                        <div className='my-4'>
                            <h5 className={`d-flex align-items-center ${styles.categoryName}`}>
                                <IoIosArrowRoundBack className='me-3'/>{data.gallery.name}
                            </h5>
                        </div>
                </Link>
            )
        } else {
            return (
                <div className='my-4'>
                    <h5>Kategórie</h5>
                </div>
            )
        }
    }
    
    
    return (
        <>
            { subtitle() }
        </>
    )

}