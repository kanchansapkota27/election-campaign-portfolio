import { useState } from 'react'
import UMLLogo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'



const navs=[
    {
        name:'Home',
        path:'/',
        exact:true

    },
    {
        name:'About',
        path:'/about'
    },
    {
        name:'Manifesto',
        path:'/manifesto'
    },
    {
        name:'Join the Team',
        path:'/support'
    },
    {
        name:'Media',
        path:'/news'
    },
    {
        name:'Contact',
        path:'/contact'
    }
]

const TopNav = () => {

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(menu => !menu);
    }

    return (
        <>
            <header className=' bg-topbar flex flex-col md:flex-row shadow-lg z-100'>
                <div className='w-full px-4 py-2 flex justify-between items-center'>
                    
                    <a className='flex justify-center items-center cursor-pointer' href='/'>
                        <img src={UMLLogo} alt='UML Logo' className=' aspect-auto w-24 h-18 hover:animate-spin' />
                        <p className='hidden lg:block text-base text-red-500 font-bold'>Krishna B. Pokhrel</p>
                        <p className='md:hidden text-red-500 font-semibold font-popins'>#vote4kbp</p>
                    </a>
                    {/** Desktop and Tablet Menu Buttons **/}
                    <div className='h-full  flex items-center'>
                        <ul className='hidden justify-around items-center font-semibold space-x-4 px-4 md:flex'>
                            {
                                navs.map(nav => (
                                    <NavLink to={nav.path}
                                    key={nav.name}
                                    end={nav?.exact}
                                    className={
                                        ({ isActive }) => isActive ?
                                        'px-3 py-2 w-full rounded text-white  bg-topbarActive whitespace-nowrap':
                                        'px-3 py-2 w-full rounded hover:text-white  hover:bg-topbarActive whitespace-nowrap'
                                    }
                                    >
                                    {nav.name}
                                    </NavLink>
                                ))
                            }
                        </ul>
                        <div className='flex items-center  w-full justify-end px-2 md:hidden'>
                            <AiOutlineMenu className='text-2xl cursor-pointermd:hidden' onClick={toggleMenu} />
                        </div>
                    </div>
                </div>
                <div className='w-full md:hidden justify-center items-center'>
                    {
                        showMenu && (
                            <ul className='flex divide-y-2 flex-col justify-around items-center font-semibold md:hidden'>
                                {
                                    navs.map(nav => (
                                        <NavLink 
                                        key={'mobile-'+nav.name}
                                        to={nav.path}
                                        end={nav?.exact}
                                        className={
                                        ({ isActive }) => isActive ?
                                            'px-3 py-2 w-full  text-white  bg-topbarActive whitespace-nowrap':
                                            'px-3 py-2 w-full hover:text-white  hover:bg-topbarActive whitespace-nowrap'
                                        }
                                            >
                                            {nav.name}
                                        </NavLink>
                                    ))
                                }
                            </ul>
                        )
                    }

                </div>
            </header>
        </>
    )
}

export default TopNav