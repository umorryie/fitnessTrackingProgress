import './FriendsContent.css';
import { useSelector } from 'react-redux';
import { selectFriends } from '../../redux/features/friends';
import { selectAllUsers } from '../../redux/features/allUsers';
import Friend from '../Friend/Friend';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
const emptyArray: any[] = [];

function FriendsContent() {
    const acceptFriendRequestIcon = <FontAwesomeIcon icon={faUserPlus} className="add-friend-icon" onClick={() => toggleAddingFriends()} />

    const allUsers = useSelector(selectAllUsers);
    const friends = useSelector(selectFriends);

    const [searchFriends, setSearchFriends] = useState('');
    const [searchUsers, setSearchUsers] = useState('');
    const [displayedFriends, setDisplayedFriends] = useState(emptyArray);
    const [addingFriends, setAddingFriends] = useState(false);
    const [filteredAllUsers, setFilteredAllUsers] = useState([]);

    useEffect(() => {
        const allFriends = [...friends.friends.friendsAddedMe.confirmed,
        ...friends.friends.friendsAddedMe.pending,
        ...friends.friends.friendsAddedMySelf.confirmed,
        ...friends.friends.friendsAddedMySelf.pending];
        setDisplayedFriends(allFriends);

        const friendsFirstLastNameList = allFriends.map(el => `${el.firstName} ${el.lastName}`);
        setFilteredAllUsers(allUsers.allUsers.users.filter((el: any) => !friendsFirstLastNameList.includes(`${el.firstName} ${el.lastName}`)))
    }, [friends.friends]);

    const renderFriends = () => {
        // if friends should be displayed. You are not trying to add friends
        if (!addingFriends) {
            if (!searchFriends || searchFriends === "") {
                return displayedFriends.map((el, key) => <Friend data={el} key={key} addingFriends={false} />);
            } else {
                return displayedFriends.filter(el => `${el.firstName} ${el.lastName}`.toLowerCase().includes(searchFriends.toLowerCase()))
                    .map((el) => <Friend data={el} key={el.friendshipId} addingFriends={false} toggleAddingFriends={toggleAddingFriends} />);
            }
        } else {// when you are trying to add friends and users whom you are not friend with are displayed
            if (!searchUsers || searchUsers === "") {
                return filteredAllUsers.map((el: any, key: number) => <Friend data={el} key={key} addingFriends={true} toggleAddingFriends={toggleAddingFriends} />);
            } else {
                return filteredAllUsers.filter((el: any) => `${el.firstName} ${el.lastName}`.toLowerCase().includes(searchUsers.toLowerCase()))
                    .map((el: any, key: number) => <Friend data={el} key={key} addingFriends={true} toggleAddingFriends={toggleAddingFriends} />);
            }
        }
    };

    const toggleAddingFriends = () => {
        setAddingFriends(!addingFriends);
        setSearchFriends('');
        setSearchUsers('');
    };

    return (
        <div className="friend-wrapper">
            <div className="friends-container">
                <div className="friends-content">
                    <div className="friends-list">
                        <div className="searchInput">
                            <input
                                type="text"
                                className="search-friends-input"
                                name="text"
                                value={addingFriends ? searchUsers : searchFriends}
                                placeholder={addingFriends ? "Search for friends" : "Search your friends"}
                                onChange={(e) => {
                                    console.log(addingFriends)
                                    if (addingFriends) {
                                        setSearchUsers(e.target.value)
                                    } else {
                                        setSearchFriends(e.target.value)
                                    }
                                }} />
                        </div>
                        {renderFriends()}
                    </div>
                    <div className="friends-messages">
                        <div className="add-friend-icon-wrapper">
                            {acceptFriendRequestIcon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendsContent;