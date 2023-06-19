import { User } from "next-auth";
import { FC } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/DropdownMenu";
import UserAvatar from "./UserAvatar";

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'email' | 'image'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger>

            <UserAvatar
             className="h-8 w-8"
             user={{
                name: user.name || null,
                image: user.image || null
            }} />
        </DropdownMenuTrigger>
    </DropdownMenu>
}

export default UserAccountNav