function UserPhoto({ photoUrl, photoStyle }) {
  return <img className={photoStyle} src={photoUrl} alt="user" />;
}

export default UserPhoto;
