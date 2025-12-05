import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersThunk } from '../../store/slices/usersSlice';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './UsersList.module.sass';
import defImage from './defaultPhoto.jpg';

export const UsersList = ({ users, isFetching, error, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <img src={u.image ? `http://localhost:5000/images/${u.image}` : defImage} alt={`${u.firstName} ${u.lastName}`} className={styles.userImage} />
            <p>{JSON.stringify(u)}</p>
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
