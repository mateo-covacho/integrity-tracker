import { Icon, Menu, MenuItem } from "@blueprintjs/core";
import { Popover2, Popover2InteractionKind } from "@blueprintjs/popover2";
import Link from "next/link";

const ProfilePicture = ({
  imageUrl,
  size = 40,
  signout_function,
  userData,
}: {
  imageUrl: string;
  size?: number;
  signout_function: () => void;
  userData: any;
}) => {
  const handleSignOut = () => {
    // Handle sign out logic
  };

  const handleProfile = () => {
    // Handle profile logic
  };

  const menu = (
    <Menu>
      <Link href={`/profile/${userData?.id}`}>
        <MenuItem icon='user' text='Profile' />
      </Link>
      <MenuItem icon='log-out' text='Sign Out' intent='danger' onClick={signout_function} />
    </Menu>
  );

  return (
    <Popover2 content={menu} interactionKind={Popover2InteractionKind.CLICK} placement='bottom'>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        }}
        className='ms-3'
      >
        {imageUrl ? (
          <img src={imageUrl} alt='Profile' style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e0e0e0",
            }}
          >
            <Icon icon='user' iconSize={size / 2} color='#757575' />
          </div>
        )}
      </div>
    </Popover2>
  );
};

export default ProfilePicture;
