import {deleteSession} from '../../../../api/routes/auth';
import {logout} from '../actions/creators';
import {toggleLoader} from '../../movies/actions/creators';

const deleteSessionAsync = (sessionId) => {
    return (dispatch) => {
        dispatch(toggleLoader())
        deleteSession(sessionId)
            .then(res => {
                localStorage.setItem('session_id', '')
                dispatch(logout())
                dispatch(toggleLoader())
            })
    }
}

export default deleteSessionAsync;