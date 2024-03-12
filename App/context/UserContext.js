import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };

// import { createContext, useContext, useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState("null");

//   useEffect(() => {
//     const auth = AsyncStorage.getItem("authToken");
//     console.log(auth);
//     // if (auth) {
//     //   const authen = jwt_decode(auth.token);
//     //   console.log(authen);
//     //   setAuthUser(authen.id);
//     // }
//     return;
//   }, [authUser]); // Empty depen

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
