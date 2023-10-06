import config from '../../../config';
import { IUser } from './user.interface';
import { User } from "./user.model"
import { generateUserId } from './user.utils';


const createUser = async (user:IUser):Promise<IUser | null> => {

    // generete user incremental id

    const id = await generateUserId();

    user.id = id;

    // default password

    if (!user.password) {
        user.password = config.default_user_pass as string
    }

    const createdUser = await User.create(user);

    if (!createdUser) {
        throw new Error("Fail to create user");
    };
     return createdUser;
}
 
export const UserService = {
    createUser
}


