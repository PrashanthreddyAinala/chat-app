import {useEffect} from "react";
import 'semantic-ui-css/semantic.min.css';
import {Switch, Route, useHistory} from "react-router-dom"
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Chat from "./components/Chat";
import useAuth from "./hooks/useAuth";
import './App.css';
import { useResolved } from "./hooks/useResolved";
import { ChatProvider } from "./context/chatContext";


function App() {
  const history = useHistory();
  const  authUser  = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(()=> {
    if(authResolved) {
      history.push(!!authUser ? "/" : "/login");
    }
  }, [authUser, authResolved, history])

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Chat />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <div>Loading...</div>
  )
}

export default App;
