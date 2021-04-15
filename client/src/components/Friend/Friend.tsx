import './Friend.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { deleteFriendRequest, confirmFriendRequest, sendFriendRequest } from '../../controllers/UserController';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/features/user';

const capitalizeLastOrFirstName = (userInfo: string): string => {
    return userInfo.charAt(0).toUpperCase() + userInfo.slice(1).toLowerCase();
}

function Friends(data: any) {
    const acceptFriendRequestIcon = <FontAwesomeIcon icon={faCheck} className="acceptFriendRequest"
        onClick={() => confirmFriendRequest(data.data.friendshipId, user.jwt, dispatch)} />
    const cancelFriendRequestIcon = <FontAwesomeIcon icon={faTimes} className="deleteFriendRequest"
        onClick={() => deleteFriendRequest(data.data.email, !data.data.addedMySelf, user.jwt, dispatch)} />
    const addFriend = <FontAwesomeIcon icon={faPlus} className="send-friend-request"
        onClick={() => { sendFriendRequest(data.data.email, user.jwt, dispatch); data.toggleAddingFriends(); }} />

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const determineIcons = (dataUser: any) => {
        if (data.addingFriends) {
            return <div className="friendship-confirmation">
                <span>{addFriend}</span>
            </div>;
        }
        if (!dataUser.data.confirmed) {
            if (!dataUser.data.addedMySelf) {
                return <div className="friendship-confirmation">
                    <span>{acceptFriendRequestIcon}</span>
                    <span>{cancelFriendRequestIcon}</span>
                </div>;
            } else {
                return <div className="pending-text">Pending</div>;
            }
        }
        return null;
    }

    const renderFriendContent = (dataUser: any) => {
        return <div className="friend-row">
            <div className="full-name">
                <span className="profile-image"></span>
                <span>{capitalizeLastOrFirstName(dataUser.data.firstName)}</span>
                <span>{capitalizeLastOrFirstName(dataUser.data.lastName)}</span>
            </div>
            {determineIcons(dataUser)}
        </div>
    };

    return (
        <div className="friend-container">
            <div className="friend-content">
                <div className="friends-list">
                    {renderFriendContent(data)}
                </div>
            </div>
        </div>
    );
}

export default Friends;