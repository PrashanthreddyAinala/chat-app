import { fb } from '../config';
import { Icon, Loader } from 'semantic-ui-react';
import {useChat} from "../context/chatContext"

const RailHeader = () => {

    const { chatConfig } = useChat();
    return (
        <div className="left-rail-header">
    <Icon
        onClick={() => fb.auth.signOut()}
        className="sign-out"
        name="sign out"
    />
    {!!chatConfig ? (
        <div className="current-username">{chatConfig.userName}</div>
        ) : (
            <div className="user-loading">
                <Loader active size="small" />
            </div>
        )}
    </div>
    )
};

export default RailHeader