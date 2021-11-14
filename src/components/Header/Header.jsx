import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import ThemeSwitch from '../UI/ThemeSwitch/ThemeSwitch';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../../redux/reducers/theme/actions/creators';
import deleteSessionAsync from '../../redux/reducers/users/thunks/deleteSessionAsync';
import {useHistory} from 'react-router-dom'
import MoviesMenu from './MoviesMenu/MoviesMenu';
import AccountMenu from '../UI/AccountMenu/AccountMenu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import {baseImgUrl} from '../../api/api';

function HideOnScroll(props) {
    const {children} = props
    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

export default function HideAppBar(props) {
    const history = useHistory()
    const {sessionId, userAccount} = useSelector(state => state.users)
    const {isLightMode} = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(deleteSessionAsync(sessionId))
        history.push('/')
    }

    return (
        <>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <MoviesMenu/>
                        <ThemeSwitch checked={!isLightMode} onClick={() => dispatch(toggleTheme())}/>
                        {
                            (sessionId || localStorage.getItem('session_id')) && <AccountMenu>
                                <MenuItem onClick={() => history.push('/profile')}>
                                    <Avatar>
                                        <img
                                            width='32'
                                            height='32'
                                            src={`${baseImgUrl}/${userAccount && userAccount?.avatar.tmdb.avatar_path}`}
                                            alt='avatar'
                                        />
                                    </Avatar> Profile
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={onLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </AccountMenu>
                        }
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
        </>
    )
}