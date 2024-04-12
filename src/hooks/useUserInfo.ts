import {CurrentUser} from '@/models/Models';

const currentUser = reactive<CurrentUser>({});
export default function () {
    const setUserInfo = (user: CurrentUser) => {
        Object.assign(currentUser, user);
    };

    const getUserInfo = () => {
        return currentUser;
    };

    const clearUserInformation = () => {
        Object.assign(currentUser, {
            id: undefined
        });
    }

    return {setUserInfo, getUserInfo, clearUserInformation};
}
