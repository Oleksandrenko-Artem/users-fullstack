import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { deleteUsersThunk, getUsersThunk } from '../../store/slices/usersSlice';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './UsersList.module.sass';
import defImage from './defaultPhoto.jpg';

export const UsersList = ({ users, isFetching, error, getUsers }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const handleDelete = (id) => {
    dispatch(deleteUsersThunk(id));
  }
  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul className={styles.usersList}>
        {users.map(u => (
          <li key={u.id}>
            <img src={u.image ? `http://localhost:5000/images/${u.image}` : defImage} alt={`${u.firstName} ${u.lastName}`} className={styles.userImage} />
            <div>
              <p>{JSON.stringify(u)}</p>
              <button onClick={() => handleDelete(u.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ usersData }) => usersData;

const mapDispatchToProps = dispatch => ({
  getUsers: ()=>dispatch(getUsersThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
