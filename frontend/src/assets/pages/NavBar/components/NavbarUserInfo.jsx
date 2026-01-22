function NavbarUserInfo({ username }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <img
        src={`https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff&size=32`}
        alt="avatar"
        className="rounded-circle"
        style={{ width: "32px", height: "32px" }}
      />
      <span className="text-white fw-semibold">{username}</span>
    </div>
  );
}

export default NavbarUserInfo;