import { User } from "next-auth";
import { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";
import { Icons } from "./Icons";
import { AvatarProps } from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
    return <Avatar {...props}>
        {
            user?.image
                ?
                <Image src={user.image} alt="profile picture" fill referrerPolicy="no-referrer" />
                :
                <AvatarFallback>
                    <span className="sr-only">{user?.name}</span>
                    <Icons.user className="h-4 w-4" />
                </AvatarFallback>}
    </Avatar>
}

export default UserAvatar